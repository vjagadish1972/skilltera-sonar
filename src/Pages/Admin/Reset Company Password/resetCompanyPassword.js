import react, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import ApiConstants from "../../../Services/apiconstants";
import Swal from "sweetalert2";
import { FcAbout } from "react-icons/fc";
import "./resetCompanyPassword.css";
import { Interceptor } from "../../../ErrorStatus/errorStatus"
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import Loading from "../../../Component/Loading/loading";

export default function ResetCompanyPassword() {
  const { promiseInProgress } = usePromiseTracker();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setId(JSON.parse(sessionStorage.getItem("ADMIN")).admin._id);
    setToken(JSON.parse(sessionStorage.getItem("ADMIN")).token);
  }, []);

  const onSubmit = (data) => {
    trackPromise(
      axios
        .put(
          ApiConstants.ADMIN_COMPANY_PASSWORD_RESET,
          {
            email: data.email,
            password: data.password,
          },
          {
            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              token: token,
              _id: id,
              "Access-Control-Allow-Origin": true,
              "Access-Control-Allow-Methods": "GET, POST, PATCH",
            },
          }
        )
        .then((response) => {
          Swal.fire({
            title: response.data.message,
            icon: "success",
            width: 400,
            height: 100,
          });
          reset();
        })
        .catch((error) => {
          if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
            Interceptor(error.response.status)
          }
        })
    );
  };

  const formRef = useRef();


  return (
    <>
      <div className="reset-company-password">
        {promiseInProgress === true ? (
          <Loading />
        ) : null}
        <h2 className="d-flex justify-content-center">
          Reset Company Password
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
          <div className="mb-3">
            <label className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              {...register("email", {
                required: true,
                pattern: {
                  value:
                    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  message: <p>invalid email</p>,
                },
              })}
            />
            {errors.email && (
              <p style={{ color: "red" }}>Enter the valid email </p>
            )}
          </div>
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="New Password"
              {...register("password", { required: true })}
            />
            <p style={{ color: "red" }}>
              {errors.password?.type === "required" && "Password is required"}
            </p>
          </div>
          <div className="row mt-2 ml-2">
            <button type="submit" className="btn btn-primary">
              Create
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
