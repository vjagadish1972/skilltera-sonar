import React from 'react'
import './jobDescriptionStatus.css'

export default function JobDescriptionStatus(props) {
    const today = new Date();
    const date2 = new Date(props.jobDataById?.jobId?.postedOn);
    const diffTime = Math.abs(date2 - today);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return (
        <>
            {
                props.jobDataById && <>
                    <div className='job-desc-status'>
                        <div className='job-company-job-role'>
                            <p>{props.jobDataById?.jobTitle}</p>
                        </div>
                        <div className='job-company-address'>
                            <p>{props.jobDataById?.companyId?.companyName}, {props.jobDataById?.jobId?.country} <span className='job-date'>{diffDays} Day Ago</span></p>
                        </div>
                        <div className='job-company-type'>
                            <p>Job Type ({props.jobDataById?.jobId?.jobType?.charAt(0).toUpperCase() + props.jobDataById?.jobId?.jobType?.slice(1)})</p>
                        </div>
                        {/* <div className='job-company-matches'>
                            <p><span className='percentage-matching'>{props.jobDataById.matchRating}% </span>match with the profile</p>
                        </div> */}
                        <div className='job-company-apply'>
                            <button type='button' disabled className='job-apply-btn'>{props.jobDataById?.currentStatus}</button>
                        </div>
                    </div>
                    <div className='job-desc-info'>
                        <div className='job-desc-heading'>
                            <p>Job Description</p>
                        </div>
                        <div className='all-job-info'>
                            <p dangerouslySetInnerHTML={{ __html: props.jobDataById?.jobId?.jobDescription }} />
                        </div>
                    </div>
                </>
            }



        </>
    )
}