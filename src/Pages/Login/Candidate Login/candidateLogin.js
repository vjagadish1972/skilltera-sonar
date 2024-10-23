import axios from "axios";
import "./candidateLogin.css";
import React, { useContext, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { NavLink, useNavigate } from "react-router-dom";
import Loading from "../../../Component/Loading/loading";
import { ErrorContext } from "../../../Context/errorContextState";
import { userContext } from "../../../Context/userContextState";
import { Interceptor } from "../../../ErrorStatus/errorStatus";
import ApiConstants from "../../../Services/apiconstants";
import Mixpanel from "../../../Services/mixpanel";
import { useDispatch } from "react-redux";
import ForgetPasswordModal from "../../../Component/Forget Password Modal/forgetPasswordModal";
import { selectSidebarMenuSelection } from "../../../Redux/Reducer/sidebarMenuSelectionSlice";

export default function CandidateLogin() {
  const { promiseInProgress } = usePromiseTracker();
  const { getData } = useContext(userContext);
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [setIsSubmitting] = useState(false);
  const [setisEmailVerified] = useState(true);
  const [disable, setDisable] = useState(true);
  const [errorMessage, SetErrorMessage] = useState("");

  let navigate = useNavigate();

  const onSubmit = (data) => {
    Mixpanel("Candidate tried to login", "Login Button", data.email);
    trackPromise(
      axios
        .post(ApiConstants.LOGIN, {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          sessionStorage.setItem(
            "candidate_data",
            JSON.stringify(response.data)
          );

          sessionStorage.setItem(
            "user_token",
            JSON.stringify(response.data.token)
          );
          // setUserData(() =>  [...userData ,response.data])

          sessionStorage.setItem("login", true);
          sessionStorage.setItem("candidateDashboard", true);

          //window.location.pathname = "/userProfile";
          if (response.data.policyCheck) {
            navigate("/userProfile");
          } else {
            navigate("/policy-check");
          }
          setisEmailVerified(response.data.candidate.isVerified);
          dispatch(selectSidebarMenuSelection("profile"));
          getData();
        })
        .catch((error) => {
          if (
            (error.response.status >= 404 && error.response.status <= 499) ||
            (error.response.status >= 503 && error.response.status <= 599)
          ) {
            Interceptor(error.response.status);
          } else {
            SetErrorMessage(error.response.data.error);
          }
        })
    );
    reset();
  };

  const reCaptchaSubmit = (value) => {
    setIsSubmitting(false);

    setDisable(false);
  };
  const [disableModal, setDisableModal] = useState(false);
  const forgetPasswordModal = () => {
    setDisableModal(true);
  };
  return (
    <>
      {promiseInProgress === true ? <Loading /> : null}
      <div className="candidate-login-form">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-4">
            <input
              id="email"
              className="form-control candidate-form-control"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                  message: "Entered value does not match email format",
                },
              })}
              type="email"
              placeholder="Email"
              onClick={() => SetErrorMessage("")}
            />
            {errors.email && (
              <span role="alert" style={{ color: "red" }}>
                {errors.email.message}
              </span>
            )}
          </div>
          <div className="m-4">
            <input
              id="password"
              className="form-control candidate-form-control"
              {...register("password", {
                required: "Please Enter Password",
              })}
              type="password"
              placeholder="Password"
              onClick={() => SetErrorMessage("")}
            />
            {errors.password && (
              <span role="alert" style={{ color: "red" }}>
                {errors.password.message}
              </span>
            )}
          </div>

          <div className="d-flex flex-row-reverse">
            <p className="mx-4">
              {/* <span
                onClick={forgetPasswordModal}
                style={{ color: "var(--list-item-color)", cursor: "pointer" }}
              >
                {" "}
                Forgot password?{" "}
              </span> */}

              <button 
    onClick={forgetPasswordModal} 
    style={{ 
        background: 'none', 
        border: 'none', 
        padding: 0, 
        color: 'var(--list-item-color)', 
        textDecoration: 'underline', 
        cursor: 'pointer' 
    }}
>
    Forgot password?
</button>
            </p>
          </div>

          <div className="mt-2 mb-1 d-flex justify-content-center">
            <ReCAPTCHA
              sitekey="6Lc1UbwfAAAAAFN7tTEMmUWZEQJ0Sxbr0HQ1SGiM"
              onChange={reCaptchaSubmit}
            />
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button
              className="candidate-buttonSend"
              type="submit"
              disabled={disable}
            >
              Login
            </button>
          </div>

          <div
            className="d-flex justify-content-center mt-2"
            style={{ color: "red" }}
          >
            <p>
              {" "}
              {errorMessage}
              <NavLink to="/emailVerification">
                {errorMessage.length > 95 ? (
                  <span style={{ color: "#6e4dcd" }}>
                    {" "}
                    <u> or Click Here to receive verification email again. </u>
                  </span>
                ) : (
                  ""
                )}
              </NavLink>
            </p>
          </div>
        </form>
      </div>

      {disableModal && (
        <ForgetPasswordModal
          disableModal={disableModal}
          onClose={() => setDisableModal(false)}
        />
      )}
    </>
  );
}
