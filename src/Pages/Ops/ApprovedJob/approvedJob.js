import React, { useEffect, useState, useContext } from 'react'
import JobCard from '../../../Component/JobCard/jobCard'
import ApiConstants from '../../../Services/apiconstants'
import { Interceptor } from "../../../ErrorStatus/errorStatus"
import axios from 'axios'
import { opsContext } from '../../../Context/opsContextState'
import './approvedJob.css'


const ApprovedJob = () => {

  const { approvedJobs } = useContext(opsContext)

  const [jobList, setJobList] = useState(approvedJobs)

  const [jobDesc, setJobDesc] = useState({
    jobTitle: "",
    companyId: "",
    country: "",
    state: "",
    city: "",
    jobType: "",
    workExperience: '',
    jobDescription: "",
    jobId: "",
    lastDate: "",
    postedOn: "",
    isApproved: "",
    travelRequired: ""
  })


  const handleJobDesc = (data) => {
    setJobDesc({
      jobTitle: data.jobTitle,
      companyId: data.companyId,
      country: data.country,
      state: data.state,
      city: data.city,
      jobType: data.jobType,
      jobDescription: data.jobDescription,
      jobId: data._id,
      workExperience: data.workExperience,
      lastDate: data.lastDate,
      postedOn: data.postedOn,
      isApproved: data.isApproved
    })
  }

  useState(() => {
    if (jobList.length > 0) {
      setJobDesc({
        jobTitle: jobList[0].jobTitle,
        companyId: jobList[0].companyId,
        country: jobList[0].country,
        state: jobList[0].state,
        city: jobList[0].city,
        jobType: jobList[0].jobType,
        jobDescription: jobList[0].jobDescription,
        jobId: jobList[0]._id,
        workExperience: jobList[0].workExperience,
        lastDate: jobList[0].lastDate,
        postedOn: jobList[0].postedOn,
        isApproved: jobList[0].isApproved,
        travelRequired: jobList[0].travelRequired
      })
    }
  }, [jobList])


  return (
    <>
      {jobList.length > 0 ?
        <div className='' >
          <div className='row'>
            <div className="col-lg-5 leftcontent ">
              {jobList.length > 0 ? jobList.map((data, i) => {

                return (

                  <JobCard key={i} {...data} onDataChange={() => handleJobDesc({ ...data })} />

                )
              }
              )
                : ""}
            </div>

            <div className="col-lg-7  ">
              <div className='descBox'>
                <div className='jobTitle'>
                  <div className='jobTitleBox'>
                    <p style={{ fontSize: '1.2rem', fontWeight: '500' }} >{jobDesc.jobTitle}</p>
                    <p>{jobDesc.companyId.companyName}. {jobDesc.companyId.companyName}  <span style={{ color: "#FF8C04", fontSize: '11px', marginLeft: '1rem' }}>1 Day ago </span> </p>
                    <p style={{ fontSize: '0.8rem' }}>Job type ({jobDesc.jobType} )</p>
                    {/* <p style={{ fontSize: '0.8rem' }} >50% match with your profile</p> */}

                    <button className="btnJobApply" disabled={jobDesc.isApproved === false ? 'disabled' : null}
                      style={jobDesc.isApproved === false ? { backgroundColor: "white", color: "black" } : { backgroundColor: "green", color: "white" }}
                    >Approved</button>
                  </div>
                </div>

                <div className='jobDesc'>

                  <p style={{ alignContent: 'justify', textAlign: 'justify' }}
                    dangerouslySetInnerHTML={{ __html: jobDesc.jobDescription }}
                  >
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        : <h1 className='text-center text-secondary'>No Approved Job</h1>
      }
    </>
  )
}

export default ApprovedJob