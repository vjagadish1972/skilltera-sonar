import React, { useEffect, useRef, useState } from "react";
import "./companyLogin.css";
import { useForm } from "react-hook-form";
import ApiConstants from "../../../Services/apiconstants";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../../../Component/Footer/footer";
import Loading from "../../../Component/Loading/loading";
import { Interceptor } from "../../../ErrorStatus/errorStatus";
import NavBarNew from "../../../Component/NavBar New/navBarNew";
 
export default function CompanyLogin() {
    const { promiseInProgress } = usePromiseTracker();
    const [values, setValues] = useState({
        companyList: {},
    });

    const [isSubmitting, setIsSubmitting] = useState(true);
    const [disable, setDisable] = useState(true);
    const [errorMessage, SetErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm({
        mode: "onChange",
    });

    const companyUserList = () => {
        axios
            .get(ApiConstants.COMPANY_DATA)
            .then((response) => {
                setValues({
                    ...values,
                    companyList: response.data.company.filter(
                        (v, i, a) =>
                            a.findIndex((t) =>
                                ["companyName"].every((k) => t[k] === v[k])
                            ) === i
                    ),
                });
            })
            .catch((error) => {
                if (
                    (error.response.status >= 404 &&
                        error.response.status <= 499) ||
                    (error.response.status >= 502 &&
                        error.response.status <= 599)
                ) {
                    Interceptor(error.response.status);
                }
            });
    };
    useEffect(() => {
        companyUserList();
    }, []);

    const onSubmit = (data) => {
        trackPromise(
            axios
                .post(ApiConstants.COMPANY_LOGIN, {
                    companyName: data.company_name,
                    email: data.email,
                    password: data.password,
                })
                .then((response) => {
                    sessionStorage.setItem(
                        "company_loggedin_user_data",
                        JSON.stringify(response.data)
                    );
                    sessionStorage.setItem("login", true);
                    sessionStorage.setItem("companyDashboard", true);
                    reset();
                    window.location.pathname = "/company";
                })
                .catch((error) => {
                    if (
                        (error.response.status >= 404 &&
                            error.response.status <= 499) ||
                        (error.response.status >= 502 &&
                            error.response.status <= 599)
                    ) {
                        Interceptor(error.response.status);
                    } else {
                        SetErrorMessage(error.response.data.error);
                    }
                })
        );
    };

    const reCaptchaSubmit = (value) => {
        setIsSubmitting(false);
        setDisable(false);
    };

    //e.target.reset();

    // ............clearInputFiled after filldata.....

    const formRef = useRef();

    return (
        <div>
            <NavBarNew />
            {promiseInProgress === true ? <Loading /> : null}
            <div className="company-login ">
                <h2 className="d-flex justify-content-center mt-3">
                    Client Log In
                </h2>

                <form onSubmit={handleSubmit(onSubmit)} ref={formRef}>
                    <div className="m-4">
                        <input
                            type="email"
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                            className="form-control border-top-0 border-left-0 border-right-0 mt-4"
                            placeholder="name@example.com"
                            {...register("email", { required: true })}
                            onClick={() => SetErrorMessage("")}
                        />
                        <p style={{ color: "red" }}>
                            {errors.email?.type === "required" &&
                                "Email is required"}
                        </p>
                    </div>
                    <div className="m-4">
                        <input
                            className="form-control border-top-0 border-left-0 border-right-0 mt-4"
                            list="datalistOptions"
                            placeholder="Type to search..."
                            {...register("company_name", { required: true })}
                            onClick={() => SetErrorMessage("")}
                        />
                        <datalist
                            id="datalistOptions"
                            style={{ width: "300%" }}
                        >
                            {Object.keys(values.companyList).map((d, i) => {
                                return (
                                    <option
                                        key={i}
                                        value={
                                            values.companyList[d].companyName
                                        }
                                    />
                                );
                                console.log(values.companyList[d].companyName);
                            })}
                        </datalist>
                        <p style={{ color: "red" }}>
                            {errors.company_name?.type === "required" &&
                                "Company Name is required"}
                        </p>
                    </div>
                    <div className="m-4">
                        <input
                            type="password"
                            className="form-control border-top-0 border-left-0 border-right-0 mt-4"
                            placeholder="Password"
                            {...register("password", { required: true })}
                            onClick={() => SetErrorMessage("")}
                        />
                        <p style={{ color: "red" }}>
                            {errors.password?.type === "required" &&
                                "Password is required"}
                        </p>
                    </div>

                    <div className="mt-2 mb-1 d-flex justify-content-center">
                        <ReCAPTCHA
                            sitekey="6Lc1UbwfAAAAAFN7tTEMmUWZEQJ0Sxbr0HQ1SGiM"
                            onChange={reCaptchaSubmit}
                        />
                    </div>

                    <div className="d-flex justify-content-center mt-3 mb-3">
                        <button
                            type="submit"
                            className="buttonSend
 me-md-2"
                            
                            disabled={disable}
                        >
                            Log In
                        </button>
                    </div>

                    <div
                        className="d-flex justify-content-center"
                        style={{ color: "red" }}
                    >
                        {errorMessage}
                    </div>
                </form>
            </div>

            <div className="d-flex justify-content-center informationalMess">
                <span>
                    If you are a new user to this portal and dont have email id
                    and password. Feel free to{" "}
                    <NavLink exact to="/contact">
                        {" "}
                        <span style={{ color: "#6e4dcd" }}>
                            Contact Us
                        </span>{" "}
                    </NavLink>{" "}
                </span>
            </div>

            <div className="row companyLoginFoot">
                <Footer />
            </div>
        </div>
    );
}
