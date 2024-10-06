import react, { useState, useEffect, useRef } from "react";

import axios from "axios";
import "./opsLogin.css";
import { useForm } from "react-hook-form";
import ApiConstants from "../../../Services/apiconstants";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { FcAbout } from "react-icons/fc";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../../Component/Loading/loading"
import NavBarNew from "../../../Component/NavBar New/navBarNew";

const OpsLogin = () => {
  const { promiseInProgress } = usePromiseTracker();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [isEmailVerified, setisEmailVerified] = useState(false);
  let navigate = useNavigate();

  const onSubmit = (data) => {

    trackPromise(
      axios
        .post(ApiConstants.ADMIN_LOGIN, {
          email: data.email,
          password: data.password,
        })
        .then((response) => {

          sessionStorage.setItem("opsLogin", true);
          sessionStorage.setItem("opsDashboard", true);

          sessionStorage.setItem("ops_data", JSON.stringify(response.data))

          sessionStorage.setItem("ops_token", JSON.stringify(response.data.token));
          reset();

          window.location.pathname = "/ops-main-page";
        })
        .catch((error) => {



          if (error.message === "Request failed with status code 400") {
            Swal.fire({
              title: error.response.data.error,
              icon: "info",
              width: 400,
              height: 100,
            });
          } else if (error.message === "Network Error") {
            Swal.fire({
              title: "Backend not connected",
              icon: "info",
              width: 400,
              height: 100,
            });
          }

          //   if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
          //     Interceptor(error.response.status)
          //   }

        })
    );
  };

  function showHint() {
    alert(
      "1. At least 8 characters \n 2. At least one special char \n 3. At least one number \n 4. At least one upper and one lower case char. \n "
    );
  }

  // ............clearInputFiled after filldata.....

  const formRef = useRef();


  return (
    <div style={{ height: '100vh' }}>

      <NavBarNew />
      <div className="continer-fluid adminSignin border">

        {promiseInProgress === true ? (
          <Loading />
        ) : null}

        <h2 className="d-flex justify-content-center">Ops Sign-in</h2>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              {...register("email", {
                required: true,
                // pattern: {
                //   value:
                //     /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                //   message: <p>invalid email</p>,
                // },
              })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>Enter the valid email </p>
            )}

            {/* <p style={{ 'color': 'red' }}>{errors.email?.type === 'required' && "Email is required"} </p> */}
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              {...register("password", {
                required: true,
                // pattern: { value: /^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/ },
              })}
            />
            {errors.password && (
              <p style={{ color: "red" }}>
                Enter the strong password{" "}
                <button onClick={showHint} className="showHint">
                  {" "}
                  <FcAbout />
                </button>{" "}
              </p>
            )}

            {/* <p style={{ 'color': 'red' }}>  {errors.password?.type === 'required' && "Password is required" }  </p> */}
          </div>
          <div className="row ml-1 mr-1">
            <button
              type="submit"
              className="btn btn-primary "

            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default OpsLogin