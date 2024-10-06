import {
    Route,
    Routes
} from "react-router-dom";
import { UserContextState } from "../Context/userContextState";
import About from "../Pages/About/about";
import AdminMainScreen from "../Pages/Admin/Admin Main Screen/adminMainScreen";
import AllCandidates from "../Pages/Admin/All Candidates/allCandidates";
import Admin from "../Pages/Admin/admin";
import Blog from "../Pages/Blog/blog";

import NewCandidateAccountValidation from "../Component/New Account Validation/newCandidateAccountValidation";
import NewReferralAccountValidation from "../Component/New Account Validation/newReferralAccountValidation";
import AllJobs from "../Pages/All Jobs/allJobs";
import Contact from "../Pages/Contact/contact";
import EmailVerification from "../Pages/EmailVerification/emailVerification";
import ForgetPassword from "../Pages/Forget Password/forgetpassword";
import Home from "../Pages/Home/home";
import JobsStatus from "../Pages/Jobs Status/jobsStatus";
import NotFoundPage from "../Pages/NotFoundPage/notFoundPage";
import OpsLogin from "../Pages/Ops/OpsLogin/opsLogin";
import OpsMain from "../Pages/Ops/OpsMain/opsMain";
import Recommendation from "../Pages/Recommendation/recommendation";
import ReferalEmailVerification from "../Pages/ReferalAny/ReferalEmailVerification/referalEmailVerification";
import ReferedPage from "../Pages/ReferalAny/ReferedPage/referedPage";
import ReferralInfo from "../Pages/ReferalAny/Referral Info/referralInfo";
import UserReferal from "../Pages/UserEditProfile/User Referal/userReferal";
import UserProfile from "../Pages/UserProfile/userProfile";
import PolicyCheck from "../Pages/Policy check/policyCheck"
import SecuredRoutes from "./securedroutes";

//Client Routes
import BlogDetails from "../Pages/Blog/BlogDetails/blogDetails";
import CandidateChat from "../Pages/Candidate Chat/candidateChat";
import CompanyDashboard from "../Pages/Company/Company Dashboard/companyDashboard";
import CompanyMessage from "../Pages/Company/Company Message/companyMessage";
import ViewProfile from "../Pages/Company/Company View Profile/viewProfile";
import CompanyMainScreen from "../Pages/Company/MainScreen/companyMainScreen";

export default function RoutesPath() {
    return (

        <UserContextState>
            <Routes>
                <Route exact path="/" element={
                    sessionStorage.getItem("candidateDashboard") ? (
                        <UserProfile />
                    ) : sessionStorage.getItem("companyDashboard") ? (
                        <CompanyMainScreen />
                    ) : sessionStorage.getItem("candidateDashboardRef") ? (
                        <ReferedPage />
                    ) : (
                        <Home />
                    )
                } />

                <Route exact path="/client" element={
                    sessionStorage.getItem("candidateDashboard") ? (
                        <UserProfile />
                    ) : sessionStorage.getItem("companyDashboard") ? (
                        <CompanyMainScreen />
                    ) : sessionStorage.getItem("candidateDashboardRef") ? (
                        <ReferedPage />
                    ) : (
                        <Home />
                    )
                } />


                <Route exact path="/refer" element={
                    sessionStorage.getItem("candidateDashboard") ? (
                        <UserProfile />
                    ) : sessionStorage.getItem("companyDashboard") ? (
                        <CompanyMainScreen />
                    ) : sessionStorage.getItem("candidateDashboardRef") ? (
                        <ReferedPage />
                    ) : (
                        <Home />
                    )
                } />


                <Route element={<SecuredRoutes />}>
                    <Route exact path="/userReferal" element={<UserReferal />} />
                    <Route exact path="/referralInfo" element={<ReferralInfo />} />
                    <Route exact path="/company/allCandidate" element={<AllCandidates />} />
                    <Route exact path="/company/dashboard" element={<CompanyDashboard />} />
                    <Route exact path="/admin" element={<AdminMainScreen />} />
                    <Route exact path="/company/candidate/:id" element={<ViewProfile />} />
                    <Route exact path="/company" element={<CompanyMainScreen />} />
                    <Route exact path="/status" element={<JobsStatus />} />
                    <Route exact path="/userProfile" element={<UserProfile />} />
                    <Route exact path="/jobs" element={<AllJobs />} />
                    <Route exact path="/userProfile" element={<UserProfile />} />
                    <Route exact path="/policy-check" element={<PolicyCheck/>} />
                    <Route exact path='/chat' element={<CandidateChat />} />
                    <Route exact path="/messages" element={<CompanyMessage />} />
                </Route>

                <Route exact path="/forgotPassword" element={<ForgetPassword />} />

                <Route exact path="/about" element={<About />} />

                <Route exact path="/blog" element={<Blog />} />
                <Route exact path="/blog-details/:blogId" element={<BlogDetails />} />

                <Route exact path="/contact" element={<Contact />} />

                <Route exact path="/emailVerification" element={<EmailVerification />} />

                <Route exact path="/referalEmailVerification" element={<ReferalEmailVerification />} />

                <Route exact path="/adminLogin" element={<Admin />} />

                <Route exact path="/opsLogin" element={<OpsLogin />} />

                <Route exact path="/ops-main-page" element={<OpsMain />} />

                <Route exact path="/new/account/:id" element={<NewCandidateAccountValidation />} />

                <Route exact path="/new/referral/account/:id" element={<NewReferralAccountValidation />} />

                <Route exact path="/refered" element={<ReferedPage />} />

                <Route path="/recommendation/verify/:uniqueId" element={<Recommendation />} />

                <Route exact path="*" element={<NotFoundPage />} />
            </Routes>
        </UserContextState >
    );
}
