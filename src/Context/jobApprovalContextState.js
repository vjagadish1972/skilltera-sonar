import React, { useState, useEffect, createContext, useMemo} from "react";
import ApiConstants from "../Services/apiconstants";
import PropTypes from "prop-types"; // Import PropTypes
import axios from "axios";

export const jobApprovalContext = createContext();

export const JobApprovalContextState = (props) => {
const [jobList, setJobList] = useState([]);
const [skillList ,  setSkillList] = useState([])
const [companiesList, setCompaniesList] = useState([])
const [allJobRole , setAllJobRole] = useState([])
const [jobDesc, setJobDesc] = useState({
        jobTitle: "",
        companyId: "",
        country: "",
        state: "",
        city: "",
        jobType: "",
        jobDescription: "",
        operatorId:"",
        jobId: "",
        lastDate: "",
        postedOn: "",
        isApproved: "",
        workExperience: "",
        jobRole:"",
        travelRequired:"",
        skillRequired:""
    });


    const updateSkillListData = (newSkill) => {

        setSkillList([...skillList , newSkill])
      
      }

    const getData = async () => {
        if (sessionStorage.getItem("ADMIN") !== null) {
            const token = JSON.parse(sessionStorage.getItem("ADMIN")).token;

            await axios
                .get(ApiConstants.GET_ALL_JOBS, {
                    headers: {
                        Accept: "application/json",
                        "Content-type": "application/json",
                        token: token,
                        "Access-Control-Allow-Origin": true,
                        "Access-Control-Allow-Methods": "GET, POST, PATCH",
                    },
                })
                .then((res) => {
                    let unapprovedData = res.data.jobs.filter((ele) => {
                        return ele.status !== "APPROVED";
                    });
                    unapprovedData = unapprovedData.filter((ele) => {
                        return ele.status !== "REJECTED";
                    });
                    setJobList(unapprovedData);
                })
                .catch((error) => {
                    // if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
                    //   Interceptor(error.response.status)
                    // }
                    console.log("data not found from contextside");
                });

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
    };

    useEffect(() => {
        getData();
    }, [sessionStorage.getItem("ADMIN")]);

    useEffect(() => {
        if (jobList.length > 0) {
            setJobDesc({
                jobTitle: jobList[0].jobTitle,
                companyId: jobList[0].companyId,
                country: jobList[0].country,
                state: jobList[0].state,
                city: jobList[0].city,
                jobType: jobList[0].jobType,
                jobDescription: jobList[0].jobDescription,
                operatorId:jobList[0].operatorId,
                jobId: jobList[0]._id,
                lastDate: jobList[0].lastDate,
                postedOn: jobList[0].postedOn,
                isApproved: jobList[0].isApproved,
                workExperience: jobList[0].workExperience,
                jobRole: jobList[0].jobRole,
                travelRequired:jobList[0].travelRequired,
                skillRequired:jobList[0].skillRequired
            });
        }
    }, [jobList]);

// Memoize the value object to avoid unnecessary re-renders
  const contextValue = useMemo(
    () => ({
      jobList,
      jobDesc,
      skillList,
      companiesList,
      allJobRole,
      updateSkillListData,
    }),
    [jobList, jobDesc, skillList, companiesList, allJobRole]
  );

    return (
        <jobApprovalContext.Provider value={contextValue}>
            {props.children}
        </jobApprovalContext.Provider>
    );
};

// Define prop types for the component
JobApprovalContextState.propTypes = {
    children: PropTypes.node.isRequired, // Validate children prop
};