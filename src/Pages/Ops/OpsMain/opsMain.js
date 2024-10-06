import React, { useContext } from 'react';
import TabSet from '../../../Component/Tabsets/tabSet';
import uesrImageDefault from "../../../Assets/profilePic.png";
import Logo from "../../../Assets/skilltera_logo1.png"
import AddJobDesc from '../AddJobDesc/addJobDesc';
import PendingApproval from '../PendingApproval/pendingApproval';
import ApprovedJob from '../ApprovedJob/approvedJob';
import RejectedJob from '../RejectJobs/rejectJobs';
import { opsContext } from '../../../Context/opsContextState'


const OpsMain = () => {

  const { rejectedJobs, pendingJobs,approvedJobs } = useContext(opsContext)

  const logout = () => {
    window.location.pathname = "/";
    sessionStorage.clear();
  }

  return (
    <>
      {<div>
        <nav className="navbar navbar-expand-lg">
          <div className="container">
            <span className="navbar-brand" >
              <img src={Logo} alt="logo" className="img-fluid" />
            </span>
            <div className='toggle-bar-new'>
              <button
                className="navbar-toggler" type="button"
                data-toggle="collapse" data-target="#navbarSupportedContent"
              >
                <i className="fa fa-bars" aria-hidden="true"></i>
              </button>
            </div>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">


              <ul className="navbar-nav ms-auto">

                <li className="nav-item class_li">
                  <span className="nav-link dropdown-toggle" data-toggle="dropdown">
                    <img src={uesrImageDefault} className="img-fluid rounded-circle" style={{ width: '32px', height: '32px' }} />
                  </span>
                  <div className="dropdown-menu">
                    <span className="dropdown-item" onClick={logout} style={{ cursor: 'pointer' }}>
                      <i className="fa fa-sign-out me-2" aria-hidden="true"></i>
                      <span>Logout</span>
                    </span>
                  </div>
                </li>
              </ul>

            </div>
            <div className="right-side-items">

            </div>

          </div>
        </nav>
      </div>
      }

      <TabSet>
        <div label="Add Jobs">
          <AddJobDesc />
        </div>
        <div label={`Pending Approval (${pendingJobs.length})`}>
          <PendingApproval />
        </div>
        <div label={`Rejected Jobs (${rejectedJobs.length})`}>
          <RejectedJob />
        </div>
        <div label={`Approved Job (${approvedJobs.length})`}>
          <ApprovedJob />
        </div>
      </TabSet>

    </>
  );
}

export default OpsMain
