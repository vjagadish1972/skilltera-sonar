import Modal from "react-bootstrap/Modal";
import React, { useState, useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import axios from "axios";
import ApiConstants from "../../Services/apiconstants";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../Component/Loading/loading";
import "./forgetPasswordModal.css";
import { Interceptor } from "../../ErrorStatus/errorStatus";
import Swal from "sweetalert2";
import PropTypes from "prop-types";

export default function ForgetPasswordModal({ disableModal, onClose }) {
  const [isOpen ] = useState(disableModal);

  const [ setIsSubmitting] = useState(true);

  const { promiseInProgress } = usePromiseTracker();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onBlur",
  });

  const {
    register: register2,
    formState: { errors: errors2 },
    handleSubmit: handleSubmit2,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const [email, setEmail] = useState("");
  const [getOtp, setGetOtp] = useState(false);
  const [otpButtonDisabled, setOtpButtonDisabled] = useState(true);

  const [emailErrorMessage, setEmailErrorMessage] = useState("");
  const [passwordErrorMessage, setPasswordErrorMessage] = useState("");
  const [disable, setDisable] = useState(true);

  const onSubmitEmail = (data) => {
    setEmail(data.email);

    trackPromise(
      axios
        .post(ApiConstants.FORGET_PASSWORD, {
          email: data.email,
        })
        .then((response) => {
          setGetOtp(true);
          reset();
        })
        .catch((error) => {
          if (
            (error.response.status >= 404 && error.response.status <= 499) ||
            (error.response.status >= 502 && error.response.status <= 599)
          ) {
            Interceptor(error.response.status);
          } else {
            setEmailErrorMessage(error.response.data.error);
          }
        })
    );
    setOtpButtonDisabled(false);
    reset();
  };

  const onSubmitOtp = (data) => {
    if (data.newpassword === data.cnfnewpassword) {
      trackPromise(
        axios
          .post(ApiConstants.RESET_PASSWORD, {
            otpCode: data.otp,
            password: data.newpassword,
          })
          .then((response) => {
            Swal.fire({
              icon: "success",
              title: "Password Change Successfully",
              showConfirmButton: true,
            }).then(function (isConfirm) {
              if (isConfirm) {
                window.location.pathname = "/";
              }
            });

            reset();
          })
          .catch((error) => {
            if (
              (error.response.status >= 404 && error.response.status <= 499) ||
              (error.response.status >= 502 && error.response.status <= 599)
            ) {
              Interceptor(error.response.status);
            } else {
              setPasswordErrorMessage(
                "New Password and Confirm Password do not match"
              );
            }
          })
      );
    } else {
      setPasswordErrorMessage("New Password and Confirm Password do not match");
    }
  };

  // ...clearInputFiled after filldata...

  const formRef = useRef();

  const handleError = () => {
    setEmailErrorMessage("");
  };

  const handleError2 = () => {
    setPasswordErrorMessage("");
  };

  const reCaptchaSubmit = (value) => {
    setIsSubmitting(false);
    setDisable(false);
  };
  return (
    
      <Modal show={isOpen} centered onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Forgot Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="">
            {promiseInProgress === true ? <Loading /> : null}

            {!getOtp && (
              <form
                key={1}
                onSubmit={handleSubmit(onSubmitEmail)}
                className=""
                ref={formRef}
              >
                <span className="d-flex justify-content-center mt-4">
                  Reset password by email verification
                </span>
                <div className="modal-body">
                  <div className="mb-3">
                    <input
                      id="email"
                      className="form-control forgetPassword-form-control"
                      disabled={getOtp}
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                          message: "Invalid email format",
                        },
                      })}
                      type="email"
                      onClick={handleError}
                      placeholder="Enter email address"
                    />
                    {errors.email && (
                      <span role="alert" style={{ color: "red" }}>
                        {errors.email.message}
                      </span>
                    )}

                    <span role="alert" style={{ color: "red" }}>
                      {emailErrorMessage}
                    </span>
                  </div>
                </div>
                <div className="mt-2 mb-1 d-flex justify-content-center">
                  <ReCAPTCHA
                    sitekey="6Lc1UbwfAAAAAFN7tTEMmUWZEQJ0Sxbr0HQ1SGiM"
                    onChange={reCaptchaSubmit}
                  />
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="forgetPassword-buttonSend"
                    disabled={disable}
                  >
                    Get Otp
                  </button>
                </div>
              </form>
            )}

            {getOtp && (
              <form
                key={2}
                onSubmit={handleSubmit2(onSubmitOtp)}
                className=""
                ref={formRef}
              >
                <p className="d-flex justify-content-center m-4">
                  Use the OTP sent to your email to set your new password.
                  Please check your spam folder if you can not find email in
                  your inbox.
                </p>

                <div className="modal-body">
                  <div className="">
                    <input
                      type="text"
                      disabled
                      className="form-control forgetPassword-form-control"
                      placeholder={email}
                    />
                  </div>
                  <div className="mt-1">
                    <input
                      type="text"
                      disabled={otpButtonDisabled}
                      className="form-control forgetPassword-form-control"
                      id="exampleFormControlInput1"
                      placeholder="Enter OTP"
                      {...register2("otp", { required: true })}
                      onClick={handleError2}
                    />
                    <p style={{ color: "red" }}>
                      {errors2.otp?.type === "required" && "otp is required"}
                    </p>
                  </div>
                  <div className="mb-2">
                    <input
                      id="password"
                      className="form-control forgetPassword-form-control"
                      placeholder="New Password"
                      {...register2("newpassword", {
                        required: "Newpassword is required",
                      })}
                      type="password"
                      onClick={handleError2}
                    />
                    {errors.password && (
                      <span role="alert" style={{ color: "red" }}>
                        {errors.password.message}
                      </span>
                    )}
                    <span role="alert" style={{ color: "red" }}>
                      {passwordErrorMessage}
                    </span>
                  </div>
                  <div className="mt-2 mb-2">
                    <input
                      id="password"
                      className="form-control forgetPassword-form-control"
                      placeholder="Confirm password"
                      {...register2("cnfnewpassword", {
                        required: "Confirm password required",
                      })}
                      type="password"
                    />
                    {errors.password && (
                      <span role="alert" style={{ color: "red" }}>
                        {errors.password.message}
                      </span>
                    )}

                    <span role="alert" style={{ color: "red" }}>
                      {passwordErrorMessage}
                    </span>
                  </div>
                  <div className="d-flex justify-content-center mt-4">
                    <button className="forgetPassword-buttonSend" type="submit">
                      Change Password
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>
        </Modal.Body>
      </Modal>
  );
}

// Define Prop Types
ForgetPasswordModal.propTypes = {
  disableModal: PropTypes.bool.isRequired, // Validate the `disableModal` prop as a required boolean
  onClose: PropTypes.func.isRequired, // Validate the `onClose` prop as a required function
};