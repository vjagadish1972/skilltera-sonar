import "./companyNewLogin.css";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ApiConstants from "../../../Services/apiconstants";
import axios from "axios";
import { usePromiseTracker } from "react-promise-tracker";
import ReCAPTCHA from "react-google-recaptcha";
import Loading from "../../../Component/Loading/loading";
import { Interceptor } from "../../../ErrorStatus/errorStatus";
import SessionStorageService from "../../../Services/sessionStorageHandler";
//Components
import { Button } from "../../../Component/Common/Button/Button";
//API
import { postLogin } from "../../../Services/API/client.api";
export default function CompanyNewLogin() {
    const SC = SessionStorageService.getService();
    const { promiseInProgress } = usePromiseTracker();
    const [values, setValues] = useState({
        companyList: {},
    });
    const [manageUI, setManageUI] = useState({
        loginBtnDisable: true,
    });
    const [errorMessage, SetErrorMessage] = useState("");

    const {
        register,
        handleSubmit,
        formState: { errors },
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
    /* On Form Submit */
    const onSubmit = async (data) => {
        let reqData = {
            companyName: data.company_name,
            email: data.email,
            password: data.password,
        };

        const loginRes = await postLogin(reqData);

        if (loginRes.status === 200) {
            SC.setToken(loginRes.data.token);
            sessionStorage.setItem(
                "company_loggedin_user_data",
                JSON.stringify(loginRes.data)
            );
            sessionStorage.setItem("login", true);
            sessionStorage.setItem("companyDashboard", true);
            window.location.pathname = "/company";
        }
        if (
            (loginRes.status >= 404 && loginRes.status <= 499) ||
            (loginRes.status >= 502 && loginRes.status <= 599)
        ) {
            Interceptor(loginRes.status);
        } else {
            SetErrorMessage(loginRes.data.error);
        }
    };
    const reCaptchaSubmit = (value) => {
        if (value) {
            setManageUI({
                ...manageUI,
                loginBtnDisable: false,
            });
        } else {
            setManageUI({
                ...manageUI,
                loginBtnDisable: true,
            });
        }
    };

    if (promiseInProgress) return <Loading />;
    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            method="dialog"
            id="client-login"
        >
            <div className="input-box">
                <input
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    className="company-form-control"
                    placeholder="name@example.com"
                    {...register("email", { required: true })}
                    onClick={() => SetErrorMessage("")}
                    required
                />
            </div>
            <div className="input-box">
                <input
                    className="company-form-control"
                    list="datalistOptions"
                    placeholder="Type to search..."
                    {...register("company_name", { required: true })}
                    onClick={() => SetErrorMessage("")}
                />
                <datalist id="datalistOptions" style={{ width: "300%" }}>
                    {Object.keys(values.companyList).map((d, i) => {
                        return (
                            <option
                                key={i}
                                value={values.companyList[d].companyName}
                            />
                        );
                    })}
                </datalist>
                <p style={{ color: "red" }}>
                    {errors.company_name?.type === "required" &&
                        "Company Name is required"}
                </p>
            </div>
            <div className="input-box">
                <input
                    type="password"
                    className="company-form-control"
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
                    onChange={(e) => {
                        reCaptchaSubmit(e);
                    }}
                />
            </div>

            <div className="d-flex justify-content-center mt-3 mb-3">
                <Button
                    type="submit"
                    text={"Log In"}
                    form="client-login"
                    disabled={manageUI.loginBtnDisable}
                />
            </div>

            <div
                className="d-flex justify-content-center"
                style={{ color: "red" }}
            >
                {errorMessage}
            </div>
        </form>
    );
}
