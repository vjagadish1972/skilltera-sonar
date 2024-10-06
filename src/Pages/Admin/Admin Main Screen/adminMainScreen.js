import react, { useContext, useEffect, useState } from "react";
import "./adminMainScreen.css";
import Sidebar from "../../../Component/Sidebar/sidebar";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../../Component/Admin Sidebar/adminSidebar";
import CompanySignup from "../Company Signup/companySignup";
import ResetCompanyPassword from "../Reset Company Password/resetCompanyPassword";
import AllCompanies from "../All Companies/allCompanies";
import AllCandidates from "../All Candidates/allCandidates";
import CandidateSignup from "../Cadidate Signup/candidateSignup";
import SkillAddRemove from "../Skill Add Remove/skillAddRemove";
import Hamburger from '../../../Assets/ci_hamburger.png'
import { useForm } from "react-hook-form";
import JobRole from "../Job Role/jobRole";
import JobApproval from "../Job Approval/jobApproval";

import NavBarNew from "../../../Component/NavBar New/navBarNew";
import { inputSearchBar } from "../../../Redux/Reducer/searchBarSlice";

export default function AdminMainScreen() {
  const menu = useSelector((state) => state.toggleMenu);
  const dispatch = useDispatch()
  const titleSelection = useSelector(
    (state) => state.sidebarMenuSelectionReducer
  );
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const logout = () => {
    sessionStorage.clear();
    window.location.pathname = "/";
  };

  const onSubmit = (data) => {
    dispatch(inputSearchBar(data.searchKeyword))
  }

  return (
    <>
      <NavBarNew />
      <div style={{ height: 'auto', background: 'white' }}>
        <hr />
        <div className="hamburger-input-section m-2" >
          <div className="row">
            <div className="col-2 col-lg-1">
              <img src={Hamburger} data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasWithBothOptions"
                aria-controls="offcanvasWithBothOptions" style={{ cursor: 'pointer' }} />
            </div>

            <div className="col-10 col-lg-11">
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3 input-group-lg">
                  <input type="text" className="form-control" placeholder={titleSelection.menuSelection == 'All Companies' ? 'Search By Company Name'
                    : titleSelection.menuSelection == 'allCandidate' ? 'Search By Candidate Email'
                      : titleSelection.menuSelection == 'Skill Add/Remove' ? 'Search By Skill Name'
                        : titleSelection.menuSelection == 'Job Role Add/Remove' ? 'Search By Job Role Name' : 'Disabled'}
                    disabled={titleSelection.menuSelection == 'Company Signup'
                      || titleSelection.menuSelection == 'Reset Company Password'
                      || titleSelection.menuSelection == 'Candidate Signup'}
                    {...register("searchKeyword")} />
                  <div className="input-group-append">
                    <button className="btn btn-outline-secondary" type="submit" style={{ height: '52px' }}>Search</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          {(() => {
            switch (titleSelection.menuSelection) {
              case "Company Signup":
                return <CompanySignup />;
                break;
              case "Reset Company Password":
                return <ResetCompanyPassword />;
                break;
              case "All Companies":
                return <AllCompanies />;
                break;
              case "allCandidate":
                return <AllCandidates />;
                break;
              case "Candidate Signup":
                return <CandidateSignup />;
                break;
              case "Skill Add/Remove":
                return <SkillAddRemove />;
                break;
              case "Job Role Add/Remove":
                return <JobRole />;
                break;
              case "Job Approval":
                return <JobApproval />;
                break;

              case "logout":
                return logout();
                break;
              default:
                <h1>Error</h1>;
            }
          })()}
        </div>
        <AdminSidebar />
      </div>
    </>
  );
}
