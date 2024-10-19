import { useState } from "react";
import "./clientHome.css";
//Assets
import CLientSectionOneImage from "../../../Assets/clientSectionone.png";
import ClientSectionTwoImage from "../../../Assets/clientSectiontwo.png";
import ClientSectionThreeImage from "../../../Assets/clientSectionthree.png";
import ClientSectionFourImage from "../../../Assets/clientSectionfour.png";
import ClientSectionFiveImage from "../../../Assets/clientSectionfive.png";
import ClientSectionSixImage from "../../../Assets/clientSectionsix.png";
//components
import CompanyNewLogin from "../../Company/CompanyLogin/companyNewLogin";

export default function ClientHome() {
    const [clientButtonSelection, setClientButtonSelection] = useState("login");
    return (
        <>
            <div className="client-section-one">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6 client-section-first-half">
                            <div className="client-section-left">
                                <div className="client-best-talent">
                                    Hire Best Talent With
                                    <br />
                                    <span className="client-skilltera-text">
                                        Skilltera
                                    </span>{" "}
                                </div>
                                <div className="client-section-one-banner">
                                    <img
                                        className="img-fluid"
                                        src={CLientSectionOneImage}
                                        alt="client-section-one-banner"
                                    ></img>
                                </div>
                            </div>
                        </div>
                        <div className="login__container justify-center col-12 col-md-6 col-lg-6">
                            {/* Toggle Buttons */}
                            <div className="client-login-signup-button">
                                <div
                                    className="client_toggle_btn__container"
                                    role="group"
                                    aria-label="Basic example"
                                >
                                    <button
                                        type="button"
                                        className={
                                            clientButtonSelection === "login"
                                                ? "client_toggle_btn client_toggle_btn__active"
                                                : "client_toggle_btn"
                                        }
                                        onClick={() => {
                                            setClientButtonSelection("login");
                                        }}
                                    >
                                        Login
                                    </button>
                                    <button
                                        type="button"
                                        className={
                                            clientButtonSelection === "signup"
                                                ? "client_toggle_btn client_toggle_btn__active"
                                                : "client_toggle_btn"
                                        }
                                        onClick={() => {
                                            setClientButtonSelection("signup");
                                        }}
                                    >
                                        Signup
                                    </button>
                                </div>
                            </div>
                            {/* Form Fields */}
                            <div className="client-login-section">
                                {clientButtonSelection === "login" ? (
                                    <CompanyNewLogin />
                                ) : (
                                    <div>
                                        <p
                                            className="mt-5"
                                            style={{
                                                textAlign: "center",
                                                color: "#FA0909",
                                            }}
                                        >
                                            If you don’t have your login
                                            details, please send an email to{" "}
                                            <span
                                                style={{
                                                    color: "#246DA2",
                                                }}
                                            >
                                                contactus@skilltera.info
                                            </span>{" "}
                                            and request for your login details.
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="cilent-founded">
                <div className="container">
                    <p className="client-founded-text">
                        <span className="cilent-global-skilltera">
                            Skilltera
                        </span>{" "}
                        is founded based on Trust as the key pillar.
                        <br />
                        Finding the right talent becomes easier with
                        <span className="cilent-global-skilltera">
                            {" "}
                            Skilltera.
                        </span>{" "}
                        Find talent based on candidate self skill ratings,
                        <br />
                        recommendations candidates received with their skill
                        ratings, companies or clients candidates worked with and
                        other criteria.
                    </p>
                </div>
            </div>
            <div className="client-section-globally">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6 order-2 order-md-2 order-lg-1">
                            <div className="client-section-banner">
                                <img
                                    className="img-fluid"
                                    src={ClientSectionTwoImage}
                                    alt="client-section-two-banner"
                                ></img>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6 order-1 order-md-2 order-lg-2 client-text-section-globally">
                            <div className="client-text-section">
                                <p className="client-section-heading">
                                    Candidates with Self <br />
                                    skill ratings
                                </p>
                                <p className="client-section-subheading">
                                    Find candidate with self skill rating and
                                    high <br /> experience.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="client-section-globally">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6 client-text-section-globally">
                            <div className="client-text-section">
                                <p className="client-section-heading">
                                    Recommendations <br /> with skill ratings{" "}
                                </p>
                                <p className="client-section-subheading">
                                    Recommendations from verified and
                                    experienced
                                    <br /> employee and clients.
                                </p>
                                <p className="client-section-subheading">
                                    Know the real value of the candiate
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6">
                            <div className="client-section-banner">
                                <img
                                    className="img-fluid"
                                    src={ClientSectionThreeImage}
                                    alt="client-section-three-banner"
                                ></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="client-section-globally">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6 order-2 order-md-2 order-lg-1">
                            <div className="client-section-banner">
                                <img
                                    className="img-fluid"
                                    src={ClientSectionFourImage}
                                    alt="client-section-four-banner"
                                ></img>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6 order-1 order-md-2 order-lg-2 client-text-section-globally">
                            <div className="client-text-section">
                                <p className="client-section-heading">
                                    Profiles from verified <br /> referrals
                                </p>
                                <p className="client-section-subheading">
                                    Find candidate with skill rating from
                                    verified <br /> and high experienced
                                    referrals
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="client-section-globally">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6 client-text-section-globally">
                            <div className="client-text-section">
                                <p className="client-section-heading">
                                    Hire or build Talent <br /> Pipeline{" "}
                                </p>
                                <p className="client-section-subheading">
                                    Shortlist candidates build talent pipeline
                                    for <br /> future hiring.
                                </p>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6">
                            <div className="client-section-banner">
                                <img
                                    className="img-fluid"
                                    src={ClientSectionFiveImage}
                                    alt="client-section-five-banner"
                                ></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="client-section-globally">
                <div className="container">
                    <div className="row">
                        <div className="col-12 col-md-6 col-lg-6 order-2 order-md-2 order-lg-1">
                            <div className="client-section-banner">
                                <img
                                    className="img-fluid"
                                    src={ClientSectionSixImage}
                                    alt="client-section-six-banner"
                                ></img>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 col-lg-6 order-1 order-md-2 order-lg-2 client-text-section-globally">
                            <div className="client-text-section">
                                <p className="client-section-heading">
                                    Communicate, shortlist, <br />
                                    interview and hire
                                </p>
                                <p className="client-section-subheading">
                                    Hiring is easy now, shortlist the suitable
                                    <br /> candidates, chat with then, take
                                    interview
                                    <br /> and hire.{" "}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
