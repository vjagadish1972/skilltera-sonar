import React, { useState, useContext } from "react";
import "./login.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import ApiConstants from "../../Services/apiconstants";
import { useNavigate } from "react-router-dom";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { NavLink } from "react-router-dom";
import Mixpanel from "../../Services/mixpanel";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../../Component/Footer/footer";
import Loading from "../../Component/Loading/loading"
import { ErrorContext } from "../../Context/errorContextState"
import { userContext } from "../../Context/userContextState";
import Swal from "sweetalert2";
import ErrorPage from "../ErrorPage/errorPage"
import { Interceptor } from "../../ErrorStatus/errorStatus";
import NavBarNew from "../../Component/NavBar New/navBarNew";



const Login = () => {

  const { promiseInProgress } = usePromiseTracker()
  const { errorStatus, setErrorStatus } = useContext(ErrorContext)
  const { userData, getData } = useContext(userContext)


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isEmailVerified, setisEmailVerified] = useState(true);
  const [disable, setDisable] = useState(true);
  const [errorMessage, SetErrorMessage] = useState("")

  let navigate = useNavigate();

  const onSubmit = (data) => {

    Mixpanel("Candidate tried to login", "Login Button", data.email)
    trackPromise(
      axios
        .post(ApiConstants.LOGIN, {
          email: data.email,
          password: data.password,
        })
        .then((response) => {
          sessionStorage.setItem("candidate_data", JSON.stringify(response.data))

          sessionStorage.setItem("user_token", JSON.stringify(response.data.token))
          // setUserData(() =>  [...userData ,response.data])

          sessionStorage.setItem("login", true);
          sessionStorage.setItem("candidateDashboard", true);

          //window.location.pathname = "/userProfile";
          navigate('/userProfile')
          setisEmailVerified(response.data.candidate.isVerified);
          getData()
        })
        .catch((error) => {

          if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {

            Interceptor(error.response.status)

          } else {

            SetErrorMessage(error.response.data.error)

          }
        })
    );
    reset();
  };

  const reCaptchaSubmit = (value) => {

    setIsSubmitting(false)

    setDisable(false)

  }

  return (
    <>
      <NavBarNew />
      {promiseInProgress === true ? (
        <Loading />
      ) : null}

      <div className="main-box login">
        <h2 className="d-flex justify-content-center">Log in</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="m-4">

            <input
              id="email"
              className="form-control border-top-0 border-left-0 border-right-0"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
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
              className="form-control  border-top-0 border-left-0 border-right-0"
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
              <NavLink to="/forgotPassword">
                <span style={{ color: "#6e4dcd" }}> Forgot password? </span>
              </NavLink>
            </p>
          </div>

          <div className="mt-2 mb-1 d-flex justify-content-center">
            <ReCAPTCHA
             // sitekey="6Lc1UbwfAAAAAFN7tTEMmUWZEQJ0Sxbr0HQ1SGiM"
             sitekey="6LderpIpAAAAANlzMjoBRdooLQtoOrULSDQTDflr"
              onChange={reCaptchaSubmit}
            />
          </div>

          <div className="d-flex justify-content-center mt-3">
            <button className="buttonSend " type="submit" disabled={disable}
            >
              Log In
            </button>
          </div>

          <div className="d-flex justify-content-center mt-4 ">
            <span style={{ fontSize: "14px" }} > New User ?
              <NavLink to="/signup">
                <span style={{ color: "#6e4dcd" }}> <b> Sign Up </b> </span>
              </NavLink>
            </span>
          </div>

          <div className="d-flex justify-content-center" style={{ color: "red" }}>

            <p>  {errorMessage}
              <NavLink to="/emailVerification">
                {errorMessage.length > 95 ?
                  <span style={{ color: "#6e4dcd" }}> <u> or Click Here to receive verification email again. </u></span>
                  : ""}
              </NavLink>
            </p>
          </div>
        </form>
      </div>

      {/* <div className="d-flex justify-content-center informationalMess">
           
           <span>If you are a new user to this portal and dont have email id and password. Feel free to  <NavLink exact to="/contact">  <span style={{color:"#6e4dcd"}}>Contact Us</span> </NavLink> </span>
          </div> */}


      <div className="row loginFoot">

        <Footer />
      </div>

    </>
  );
};

export default Login;
