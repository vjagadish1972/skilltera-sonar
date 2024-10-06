import React, { useEffect, useState } from 'react'
import { Personal } from "./Personal/personal"
import { Professional } from "./Professional/professional"
import CompanySidebarCandidate from './Company Sidebar Candidate/companySidebarCandiate';
import { useParams } from 'react-router';
import axios from 'axios';
import ApiConstants from '../../../Services/apiconstants';
import { Interceptor } from '../../../ErrorStatus/errorStatus';
import NavBarNew from '../../../Component/NavBar New/navBarNew';
import Loading from '../../../Component/Loading/loading';
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import RecommendationCard from './RecommendationCard/recommendationCard';

const ViewProfile = () => {

  const { promiseInProgress } = usePromiseTracker();

  const { id } = useParams();

  const company_loggedin_user_data = JSON.parse(sessionStorage.getItem("company_loggedin_user_data"))

  const token = company_loggedin_user_data.token

  const userId = company_loggedin_user_data.company._id

  const [candidateDataBasedOnId, setCandidateDataBasedOnId] = useState([{}]);


  const candidateDataBasedOnIdFunction = () => {
    trackPromise(  axios
      .get(ApiConstants.CANDIDATE_DATA_BY_ID_For_COMPANY + '/' + id, {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          token: token,
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Methods": "GET, POST, PATCH",
        }

      })
      .then((response) => {
        setCandidateDataBasedOnId(response.data.candidate)
      })
      .catch((error) => {
        if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {


          Interceptor(error.response.status)
        }
        console.log(error.response.data.error)
      })
  )}
  
  useEffect(() => {
    candidateDataBasedOnIdFunction();
  }, [])
 
   return (
    <>

      <NavBarNew />
      {promiseInProgress === true ?  <Loading /> :  
      <div style={{ backgroundColor: "#eeeeee" }}>

        <div className='container' >
          <div className='row'>
            <div className="col-lg-4 pt-lg-4">
              <CompanySidebarCandidate {...candidateDataBasedOnId} previousEmployers={candidateDataBasedOnId.previousEmployers} />
            </div>

            <div className="col-lg-8 pt-lg-4" style={{height: "132vh", overflow: "auto"}} >

              <Personal
                about={candidateDataBasedOnId.about}
                education={candidateDataBasedOnId.education}
                skills={candidateDataBasedOnId.skills}
                certificate={candidateDataBasedOnId.certificate}
                {...candidateDataBasedOnId}
              />
              
             <RecommendationCard approvedRecomData ={candidateDataBasedOnId.recommendations}/> 
              <Professional
                experience={candidateDataBasedOnId.experience}
                />
            </div>
          </div>
        </div>


      </div> 
      
      }
    </>  
  )
}

export default ViewProfile
