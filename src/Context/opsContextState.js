import React, { useState, useEffect, createContext, useMemo } from 'react';
import ApiConstants from '../Services/apiconstants';
import axios from 'axios';
import { Interceptor } from "../ErrorStatus/errorStatus";

export const opsContext  = createContext()

export const OpsContextState = (props) => {

const [jobList, setJobList] = useState([])
const [skillList ,  setSkillList] = useState([])
const [companiesList, setCompaniesList] = useState([])
const [allJobRole , setAllJobRole] = useState([])
const [approvedJobs , setApprovedJobs] = useState([])
const [rejectedJobs , setRejectedJobs] = useState([])
const [pendingJobs, setPendingJobs] = useState([])
 

const [intiJobDesc] = useState({
  jobTitle:"",
  companyId:"",
  country:"",
  state:"",
  city:"",
  jobType:"",
  jobDescription:"",
  workExperience:'',
  jobId:"",
  lastDate:"",
  postedOn:"", 
  isApproved:"",
  skillRequired:""
})

const updateJobRole = (newJob) => {
  setAllJobRole([...allJobRole, newJob])
};
 

const updateSkillListData = (newSkill) => {

  setSkillList([...skillList , newSkill])

}

const getData = async () => {


  if(sessionStorage.getItem("ops_token")!== null){

    const token = JSON.parse(sessionStorage.getItem("ops_token"))
    await axios
      .get(
        ApiConstants.GET_ALL_ADDED_JOB,
        {
          headers: {
            Accept: "application/json",
            "Content-type": "application/json",
            token: token,
            "Access-Control-Allow-Origin": true,  
            "Access-Control-Allow-Methods": "GET, POST, PATCH",
          },
        }).then((res) => {
          setJobList(res.data.jobs)
          const approvedData = res.data.jobs.filter((ele) => {
            return ele.status == "APPROVED"
          })
          setApprovedJobs(approvedData)
          const pendingData = res.data.jobs.filter((ele) => {
            return ele.status == "REQUESTED"
          })
          setPendingJobs(pendingData)
          const rejectedData = res.data.jobs.filter((ele) => {
            return ele.status == "REJECTED"
          })
          setRejectedJobs(rejectedData)
        })
      .catch((error) => {
        // if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
        //   Interceptor(error.response.status)
        // }
        console.log("data not found from contextside")
      })


      axios.get(ApiConstants.GET_All_JOB_ROLES,
          {
              headers: {
                  Accept: "application/json",
                  "Content-type": "application/json",
                  token: token,
                  "Access-Control-Allow-Origin": true,
                  "Access-Control-Allow-Methods": "GET, POST, PATCH",
              }
          })
      .then((response) => {

          setAllJobRole(response.data.roles);

      })
      .catch((err) => {
        console.log("data not found from contextside" , err)
      });

      await axios.get(ApiConstants.GET_All_SKILLS,
        {
            headers: {
                Accept: "application/json",
                "Content-type": "application/json",
                token: token,
                "Access-Control-Allow-Origin": true,
                "Access-Control-Allow-Methods": "GET, POST, PATCH",
            }
        })
        .then((res) => {
           setSkillList(res.data.skills)
        })
        .catch((error) => {
          console.log("data not found from contextside" , error)
        })
         

      axios.get(ApiConstants.ALL_COMPANY_LIST,{   
        headers: {
                Accept: "application/json",
                 "Content-type": "application/json",
                 token: token,
                 "Access-Control-Allow-Origin": true,
                 "Access-Control-Allow-Methods": "GET, POST, PATCH",
             }
         }).then((res) => {
         setCompaniesList(res.data.company)
        })
        .catch((err) => {
         console.log(" company list " ,err)
     })
  }
}




  useEffect(() => {
    getData()
  }, [sessionStorage.getItem("ops_token")])

  const contextValue = useMemo(() => ({
    jobList,
    intiJobDesc,
    approvedJobs,
    rejectedJobs,
    pendingJobs,
    getData,
    companiesList,
    allJobRole,
    updateJobRole,
    skillList,
    updateSkillListData,
  }), [
    jobList,
    intiJobDesc,
    approvedJobs,
    rejectedJobs,
    pendingJobs,
    getData,
    companiesList,
    allJobRole,
    updateJobRole,
    skillList,
    updateSkillListData,
  ]);

  return (
    <opsContext.Provider value={contextValue}>
      {props.children}
    </opsContext.Provider>
  )
}
