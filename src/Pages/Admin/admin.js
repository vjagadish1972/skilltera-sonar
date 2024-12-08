import  { useRef } from "react";
import axios from "axios";
import "./admin.css";
import { useForm } from "react-hook-form";
import ApiConstants from "../../Services/apiconstants";
import { FcAbout } from "react-icons/fc";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { Interceptor } from "../../ErrorStatus/errorStatus";
import NavBarNew from "../../Component/NavBar New/navBarNew";

export default function Admin() {
  const { promiseInProgress } = usePromiseTracker();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  


  const onSubmit = (data) => {

    trackPromise(
      axios
        .post(ApiConstants.ADMIN_LOGIN, {
          email: data.email,
          password: data.password,
        })
        .then((response) => {

          if (response.data.admin.userRole === "SUPERADMIN") {
            sessionStorage.setItem("ADMIN", JSON.stringify(response.data));
            sessionStorage.setItem("login", true);
            sessionStorage.setItem("adminDashboard", true);
            window.location.pathname = "/admin"
          } else if (response.data.admin.userRole === "OPERATION") {

            sessionStorage.setItem("opsLogin", JSON.stringify(response.data));
            sessionStorage.setItem("login", true);
            sessionStorage.setItem("opsDashboard", true);

            window.location.pathname = "/addJobDesc"

          }
          reset();

        })
        .catch((error) => {

          // if (error.message === "Request failed with status code 400") {
          //   Swal.fire({
          //     title: error.response.data.error,
          //     icon: "info",
          //     width: 400,
          //     height: 100,
          //   });
          // } else if (error.message === "Network Error") {
          //   Swal.fire({
          //     title: "Backend not connected",
          //     icon: "info",
          //     width: 400,
          //     height: 100,
          //   });
          // }

          if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
            Interceptor(error.response.status)
          }

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
          <div className="d-flex align-items-center">
            <h3 className="mb-3">Loading...</h3>
            <div
              className="spinner-border ml-auto"
              role="status"
              aria-hidden="true"
            ></div>
          </div>
        ) : null}
        <h2 className="d-flex justify-content-center">Admin Sign-in</h2>
        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <div className="mb-3">
            <label className="form-label" htmlFor="email">Email address</label>
            <input
              id="email"
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
            <label className="form-label" htmlFor="password">Password</label>
            <input
              id="password"
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
            // onClick={handleClick}
            >
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
