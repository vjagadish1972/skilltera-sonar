import react, { useState } from "react";
import "./adminSidebar.css";
import { useDispatch, useSelector } from "react-redux";
import { selectSidebarMenuSelection } from "../../Redux/Reducer/sidebarMenuSelectionSlice";
import { FaUsers } from "react-icons/fa";
import { ImUserPlus } from "react-icons/im";
import { BsBuildingFillAdd, BsDatabaseFillAdd } from 'react-icons/bs'
import { MdLockReset, MdOutlineLogout } from 'react-icons/md'


export default function AdminSidebar() {

  const dispatch = useDispatch();

  const titleSelection = useSelector(
    (state) => state.sidebarMenuSelectionReducer
  );
  const menuSelection = (data) => {
    dispatch(selectSidebarMenuSelection(data));
  };
  const logout = () => {
    window.location.pathname = "/";
    sessionStorage.clear();
  };

  return (
    <div>
      <div
        className="offcanvas offcanvas-start canvas collapseOnSelect"
        data-bs-scroll="true"
        tabIndex="-1"
        id="offcanvasWithBothOptions"
        aria-labelledby="offcanvasWithBothOptionsLabel"
        data-trap-focus="true"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasWithBothOptionsLabel">
            Admin Dashboard
          </h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="list-group list-group-flush">
            {/* <li className="list-group-item admin-sidebar-font" style={{ cursor: 'pointer' }}>
                <button
                  className="btn btn-primary  mr-1"
                  active={true}
                  data-bs-dismiss="offcanvas"
                  onClick={() => menuSelection("Dashboard")}
                >
                  <FiHome />
                </button>
                <span> Dashboard</span>
              </li> */
            }

            <li className={titleSelection.menuSelection == "Company Signup" ? 'list-group-item admin-sidebar-font list-view-onCLick' : 'list-group-item admin-sidebar-font'} style={{ cursor: 'pointer' }} onClick={() => menuSelection("Company Signup")}>
              <ImUserPlus className="me-3" size={20} color="black" />

              <span>Company Signup</span>
            </li>

            <li className={titleSelection.menuSelection == "Candidate Signup" ? 'list-group-item admin-sidebar-font list-view-onCLick' : 'list-group-item admin-sidebar-font'} style={{ cursor: 'pointer' }} onClick={() => menuSelection("Candidate Signup")}>
              <ImUserPlus className="me-3" size={20} color="black" />
              <span>Candidate Signup</span>
            </li>

            <li className={titleSelection.menuSelection == "Reset Company Password" ? 'list-group-item admin-sidebar-font list-view-onCLick' : 'list-group-item admin-sidebar-font'} style={{ cursor: 'pointer' }} onClick={() => menuSelection("Reset Company Password")}>
              <MdLockReset className="me-3" size={20} color="black" />
              <span>Reset Company Password</span>
            </li>

            <li className={titleSelection.menuSelection == "All Companies" ? 'list-group-item admin-sidebar-font list-view-onCLick' : 'list-group-item admin-sidebar-font'} style={{ cursor: 'pointer' }} onClick={() => menuSelection("All Companies")}>
              <BsBuildingFillAdd className="me-3" size={20} color="black" />
              <span>All Companies</span>
            </li>

            <li className={titleSelection.menuSelection == "allCandidate" ? 'list-group-item admin-sidebar-font list-view-onCLick' : 'list-group-item admin-sidebar-font'} style={{ cursor: 'pointer' }} onClick={() => menuSelection("allCandidate")}>
              <FaUsers className="me-3" size={20} color="black" />
              <span>All Candidates</span>
            </li>
            <li className={titleSelection.menuSelection == "Skill Add/Remove" ? 'list-group-item admin-sidebar-font list-view-onCLick' : 'list-group-item admin-sidebar-font'} style={{ cursor: 'pointer' }} onClick={() => menuSelection("Skill Add/Remove")}>
              <BsDatabaseFillAdd className="me-3" size={20} color="black" />
              <span>Skills - Add/Remove</span>
            </li>
            <li className={titleSelection.menuSelection == "Job Role Add/Remove" ? 'list-group-item admin-sidebar-font list-view-onCLick' : 'list-group-item admin-sidebar-font'} style={{ cursor: 'pointer' }} onClick={() => menuSelection("Job Role Add/Remove")}>
              <BsDatabaseFillAdd className="me-3" size={20} color="black" />
              <span>Job Role - Add/Remove</span>
            </li>

            <li className={titleSelection.menuSelection == "Job Approval" ? 'list-group-item admin-sidebar-font list-view-onCLick' : 'list-group-item admin-sidebar-font'} style={{ cursor: 'pointer' }} onClick={() => menuSelection("Job Approval")}>
              <BsDatabaseFillAdd className="me-3" size={20} color="black" />
              <span>Job Approval</span>
            </li>

            <li className={titleSelection.menuSelection == "logout" ? 'list-group-item admin-sidebar-font list-view-onCLick' : 'list-group-item admin-sidebar-font'} style={{ cursor: 'pointer' }} onClick={logout}>
              <MdOutlineLogout className="me-3" size={20} color="black" />
              <span>logout</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
