import React, { useState, useContext } from "react";
import "./contact.css";
import ReCAPTCHA from "react-google-recaptcha";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import ApiConstants from "../../Services/apiconstants";
import axios from "axios";
import Swal from "sweetalert2";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Footer from "../../Component/Footer/footer";
import ContactUsImage from '../../Assets/contactus.png'
import { userContext } from "../../Context/userContextState";
import { Interceptor } from "../../ErrorStatus/errorStatus";
import NavBarNew from "../../Component/NavBar New/navBarNew";

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(true);
  const [disable, setDisable] = useState(true);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty, isValid },
  } = useForm({
    mode: "onChange",
  });
  const onSubmit = (data) => {
    trackPromise(
      axios
        .post(ApiConstants.CONTACT_MAIL, {
          name: data.name,
          email: data.email,
          message: data.message,
          reason: data.reason,
        })
        .then((response) => {
          Swal.fire({
            title: "Thank you for contacting us, we will be in touch shortly.",
            icon: "success",
            width: 400,
            height: 100,
          });
          reset()
        })
        .catch((error) => {
          if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {

            Interceptor(error.response.status)
          }

        })
    );
  };

  // ............clearInputFiled after filldata.....

  const reCaptchaSubmit = (value) => {
    setIsSubmitting(false);
    setDisable(false)

  };


  const formRef = useRef();

 

  return (

    <>
      <NavBarNew />
      <div className="contact-section">
        <div className="row">
          <div className="col-lg-6 order-md-2 order-sm-2 order-ms-2 order-lg-1 contact-blue-patch">
            <div className="contactus">
              <span>Contact Us</span>
            </div>

            <div className="contact-image">
              <img src={ContactUsImage} className="img-fluid" alt="contact-image" />
            </div>



          </div>
          <div className="col-lg-6 order-md-1 order-first order-ms-1 order-lg-2 form-section">
            <div className="get-in-touch">
              <span>Get in Touch</span>
            </div>

            <div className="feel-free">
              <span>Feel free to drop us a line below </span>
            </div>

            <div className="contact-form">
              <form
                className="row"
                onSubmit={handleSubmit(onSubmit)}
                ref={formRef}
              >
                <div className="col-12">
                  <input
                    type="text"
                    className="form-control input-group-text"
                    id="inputPassword4"
                    placeholder="Your Name"
                    {...register("name", { required: true })}
                  />
                  <p style={{ color: "red" }}>
                    {errors.name?.type === "required" && "Name is required"}
                  </p>
                </div>
                <div className="col-12">
                  <input
                    type="email"
                    className="form-control input-group-text"
                    placeholder="Your Email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    {...register("email", { required: true })}
                  />
                  <p style={{ color: "red" }}>
                    {errors.email?.type === "required" && "Email is required"}
                  </p>
                </div>
                <div className="col-12">
                  <select
                    className="form-control form-select input-group-text"
                    {...register("reason", { required: true })}
                  >
                    <option defaultValue="DEFAULT" disabled selected>Select Your Reason</option>
                    <option defaultValue="Candidate - Account and profile related">Candidate - Account and profile related</option>
                    <option defaultValue="Candidate - Account verification">Candidate - Account verification</option>
                    <option defaultValue="Candidate - Request for feature">Candidate - Request for feature</option>
                    <option defaultValue="Employer - Login related help">Employer - Login related help</option>
                    <option defaultValue="Employer - Contact Skilltera sales for hiring help">Employer - Contact Skilltera sales for hiring help</option>
                    <option defaultValue="Employer - Issue with account">Employer - Issue with account</option>
                    <option defaultValue="Employer - request for feature">Employer - request for feature</option>
                    <option defaultValue="General - Questions related to Skilltera">General - Questions related to Skilltera</option>
                    <option defaultValue="Password reset">Password reset</option>
                    <option defaultValue="Partnership with Skilltera">Partnership with Skilltera</option>
                    <option defaultValue="Suggestions">Suggestions</option>
                  </select>
                  <p style={{ color: "red" }}>
                    {errors.reason?.type === "required" && "Reason is required"}
                  </p>
                </div>
                <div className="col-12">

                  <textarea
                    className="form-control input-group-text"
                    placeholder="Leave a Message here"

                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    {...register("message", { required: true })}
                  ></textarea>
                  <p style={{ color: "red" }}>
                    {errors.message?.type === "required" && "Message is required"}
                  </p>
                </div>
                <div className="captch d-flex justify-content-center">
                  <ReCAPTCHA
                    sitekey="6Lc1UbwfAAAAAFN7tTEMmUWZEQJ0Sxbr0HQ1SGiM"
                    onChange={reCaptchaSubmit}
                  />
                </div>
                <div className="button-send-section">
                  <button
                    type="submit"
                    className="button-send"
                    disabled={disable}
                  >
                    Send
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div >

      <hr style={{
        color: '#000000',
        backgroundColor: '#000000',
        height: .5,
        borderColor: '#000000'
      }} />
      <Footer />
    </>
  );
};

export default Contact;
