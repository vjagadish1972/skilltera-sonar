import React from "react";
import "./candidateChat.css";
import { ChatItem, ChatList, Input, MessageBox } from "react-chat-elements";
import axios from "axios";
import ApiConstants from "../../Services/apiconstants";
import { useEffect } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../Component/Loading/loading";
import ChatImage from "../../Assets/chatImage.png";
import { Interceptor } from "../../ErrorStatus/errorStatus";
import { Accordion } from "react-bootstrap";
import NavBarNew from "../../Component/NavBar New/navBarNew";
import Footer from "../../Component/Footer/footer";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import CircularProgress from "@mui/material/CircularProgress";



export default function CandidateChat() {
  const candidate_loggedin_user_data = JSON.parse(
    sessionStorage.getItem("candidate_data")
  );
  const token = candidate_loggedin_user_data.token;
  const candidateId = candidate_loggedin_user_data.candidate._id;
  const candidateName = candidate_loggedin_user_data.candidate.fullname;

  const [values, setValues] = useState({
    chatListData: {},
    conversation: {},
  });

  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const [activeChat, setActiveChat] = useState(false);
  const { promiseInProgress } = usePromiseTracker();
  const [converstionShown, setConverstionShown] = useState(false);
  const [companyName, setCompanyName] = useState("");
  const [styleChat, setStyleChat] = useState();
  const [messageData, setMessageDate] = useState({
    candidateName: "",
    subject: "",
    conversationId: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm();

  const getAllChatListData = () => {
    trackPromise(
      axios
        .get(
          ApiConstants.GET_CONVERSATION_BY_CANDIDATE,

          {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              token: token,
              // _id: userId,
              "Access-Control-Allow-Origin": true,
              "Access-Control-Allow-Methods": "GET, POST, PATCH",
            },
          }
        )
        .then((response) => {
          setValues({ ...values, chatListData: response.data.conversation });
        })
        .catch((error) => {
          if (
            (error.response.status >= 404 && error.response.status <= 499) ||
            (error.response.status >= 503 && error.response.status <= 599)
          ) {
            Interceptor(error.response.status);
          }
        })
    );
  };

  const createChatMessage = (message) => {
    axios
      .post(
        ApiConstants.CREATE_CHAT_MESSAGE_BY_CANDIDATE,
        {
          text: message,
          conversationId: messageData.conversationId,
        },

        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            token: token,
            // _id: userId,
            "Access-Control-Allow-Origin": true,
            "Access-Control-Allow-Methods": "GET, POST, PATCH",
          },
        }
      )
      .then((response) => {
        getConversation(messageData.conversationId);
      })
      .catch((error) => {
        if (
          (error.response.status >= 404 && error.response.status <= 499) ||
          (error.response.status >= 503 && error.response.status <= 599)
        ) {
          Interceptor(error.response.status);
        }
      });
  };
  const getConversation = (id) => {
    axios
      .get(
        ApiConstants.GET_CANDIDATE_MESSAGE_BY_ID + id,

        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            token: token,
            // _id: userId,
            "Access-Control-Allow-Origin": true,
            "Access-Control-Allow-Methods": "GET, POST, PATCH",
          },
        }
      )
      .then((response) => {
        setValues({ ...values, conversation: response.data.messages });
        setCompanyName(response.data.conversation.companyName);
        setConverstionShown(true);
      })
      .catch((error) => {
        console.log(error);
        // if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 503 && error.response.status <= 599)) {
        //     Interceptor(error.response.status)
        // }
      });
  };

  useEffect(() => {
    getAllChatListData();
  }, []);

  const messageDialogBox = (id, candidateName, subject) => {
    setMessageDate({
      ...messageData,
      candidateName: candidateName,
      subject: subject,
      conversationId: id,
    });
    setActiveChat(true);
    getConversation(id);
    setConverstionShown(false);
    setStyleChat(id);
    values.chatListData.map((data) => {
      if (data._id == id) {
        data.candidateUnread = "0";
      }
    });
  };
  const onMessageSubmit = (data) => {
    createChatMessage(data.message);
    resetField("message");
  };

  const endConversation = async (conversationId) =>  {
    setLoading(true);

   await axios.post( ApiConstants.END_CONVERSATION_CANDIDATE,
      {
        conversationId:conversationId,
      },
      {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          token: token,
          // _id: userId,
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Methods": "GET, POST, PATCH",
        },
      }
    )
    .then((response) => {
        setTimeout(() => {
            setLoading(false);
            setDisabled(true);
        }, 1500);
    })
    .catch((error) => {
      setLoading(false);
      if (
        (error.response.status >= 404 && error.response.status <= 499) ||
        (error.response.status >= 503 && error.response.status <= 599)
      ) {
        Interceptor(error.response.status);
      }
    });
  }
 
  
  return (
    <>
      <NavBarNew />
      <div className="container">
        <div className="row candidate-chat-screen">
          <div className="col-md-12 col-lg-5">
            <div className="message-heading-candidate">
              <span>Messages</span>
            </div>
            <div className="chat-list-candidate">
              {promiseInProgress == true ? (
                <Loading />
              ) : Object.keys(values.chatListData).length > 0 ? (
                values.chatListData.map((d, index) => {
                  return (
                    <ChatItem
                      className={styleChat == d._id ? "chat-list-st" : ""}
                      avatar={
                        d.candidateImage?.length > 0
                          ? d.candidateImage
                          : "https://avatars.githubusercontent.com/u/80540635?v=4"
                      }
                      alt={"image" + index}
                      title={d.candidateName}
                      subtitle={"Sub: " + d.subject}
                      date={d.updatedAt}
                      onClick={() =>
                        messageDialogBox(d._id, d.candidateName, d.subject)
                      }
                      unread={d.candidateUnread}
                    />
                  );
                })
              ) : (
                <p
                  className="d-flex justify-content-center"
                  style={{ marginTop: "10px", color: "red" }}
                >
                  There are no messages from client. You will receive messages
                  when client’s check your profile and reach out to you for
                  recruitment process.
                </p>
              )}
            </div>
          </div>

          {activeChat && (
            <div className="col-md-12 col-lg-7">
              <div className="chat-box-heading-candidate d-flex justify-content-between">
                <div>
                  <span className="chat-name-candidate">
                    {messageData.candidateName}
                  </span>
                  <br />
                  <span className="chat-subject-candidate">
                    Sub: {messageData.subject}
                  </span>
                </div>
                <div>
                  <Button
                    onClick={() =>  endConversation(messageData.conversationId)}
                    endIcon={<SendIcon />}
                    loadingPosition="end"
                    variant="contained"
                    disabled={disabled}
                    sx={{
                      backgroundColor: disabled ? "#ff8c04aa" : "#ff8c04",
                      "&:hover": {
                        backgroundColor: disabled ? "#ff8c04aa" : "#ff8c04", 
                      },
                    }}
                  >
                     {loading ? <CircularProgress sx={{ color: "white" }} size={20} /> : "End Conversation"}
                  </Button>
                </div>
              </div>
              <div className="message-window-candidate">
                {converstionShown ? (
                  Object.keys(values.conversation).length > 0 &&
                  values.conversation.map((m) => {
                    return (
                      <MessageBox
                        position={m.senderId != candidateId ? "left" : "right"}
                        type="text"
                        title={
                          m.senderId == candidateId
                            ? candidateName
                            : companyName
                        }
                        text={m.text}
                        date={m.updatedAt}
                      />
                    );
                  })
                ) : (
                  <p className="d-flex justify-content-center">Loading....</p>
                )}
              </div>
              <div className="chat-input-candidate">
                <form onSubmit={handleSubmit(onMessageSubmit)}>
                  <div className="input-group mb-3">
                    <textarea
                      className="form-control"
                      placeholder="Write a message here...."
                      rows="3"
                      {...register("message", {
                        required: true,
                      })}
                    />

                    <button type="submit" className="btn btn-outline-secondary">
                      Send
                    </button>
                    <br />
                  </div>
                  {errors.message?.type === "required" && (
                    <p role="alert" style={{ color: "red" }}>
                      Message is required
                    </p>
                  )}
                </form>
              </div>
            </div>
          )}

          {!activeChat && (
            <div className="col-md-12 col-lg-7">
              <div className="chat-image-candidate">
                <img src={ChatImage} className="img-fluid" />
              </div>
              <div className="new-message-candidate">
                <span>Welcome to Skilltera Chat</span>
              </div>
              <div className="welcome-content-candidate">
                <p>
                  Please click on the conversation based on the sender and
                  conversation subject to continue with the conversation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
