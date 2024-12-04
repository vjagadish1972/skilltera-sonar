import React, { useState, useEffect, createContext, useMemo} from "react";
import ApiConstants from "../Services/apiconstants";
import axios from "axios";

export const userContext = createContext();

export const UserContextState = (props) => {
    const [userData, setUserData] = useState([]);
    const [profilePic, setProfilePic] = useState("");
    const [resumeData, setResumeData] = useState("");
    const [notificationStatus , setNotificationStatus ] = useState(false)
    const getData = async () => {
        if (sessionStorage.getItem("user_token") != null) {
            const token = JSON.parse(sessionStorage.getItem("user_token"));

            await axios
                .get(ApiConstants.CANDIDATE_DATA_BY_TOKEN, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        token: token,
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Methods": "GET, POST, PATCH",
                    },
                })
                .then((response) => {
                    setUserData([response.data]);
                    setProfilePic(response.data.candidate.imageLink);
                    setResumeData(response.data.candidate.resumeLink);
                 
                    return axios.get(ApiConstants.GET_NOTIFICATION_STATUS_CANDIDATE
                    , {
                        headers: {
                            Accept: "application/json",
                            "Content-type": "application/json",
                            token: token,
                            "Access-Control-Allow-Origin": true,
                            "Access-Control-Allow-Methods": "GET, POST, PATCH",
                        },
                    })
                })   
                .then((res) => {
                  
                    setNotificationStatus(res.data.notification_status)
                }) 
                .catch((error) => {
                    // if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
                    //   Interceptor(error.response.status)
                    // }
                    //console.log(error);

                });
        }
    };
    useEffect(() => {
        getData();
    }, [sessionStorage.getItem("user_token")]);

    // Optimize the value object with useMemo
    const contextValue = useMemo(() => ({
        userData,
        getData,
        profilePic,
        setProfilePic,
        resumeData,
        setResumeData,
        notificationStatus,
    }), [userData, profilePic, resumeData, notificationStatus]);

   return (
        <userContext.Provider value={contextValue}>
            {props.children}
        </userContext.Provider>
    );
};
