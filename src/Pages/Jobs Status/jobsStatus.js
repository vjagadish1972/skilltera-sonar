import React, { useState } from 'react';
import './jobsStatus.css'
import NavBarNew from '../../Component/NavBar New/navBarNew';
import CardJobsStatus from './Card Jobs Status/cardJobsStatus';

export default function JobsStatus() {

    const [jobStatusFilter, setJobStatusFilter] = useState('applied')

    return (
        <>
            <NavBarNew />
            <div style={{ backgroundColor: "#eeeeee", height: 'auto' }}>
                <div className='filter-data-block'>
                    <div className='filter-block'>
                        <div className='container'>
                            <div className='filter-inside-block'>
                                <div className=''>
                                    <button type='button' className={jobStatusFilter == 'applied' ? 'btn button-inside job-status-clicked' : 'btn button-inside button-inside'} onClick={() => setJobStatusFilter('applied')}>All Applied Jobs</button>
                                </div>
                                <div className=''>
                                    <button type='button' className={jobStatusFilter == 'shortlisted' ? 'btn button-inside job-status-clicked' : 'btn button-inside'} onClick={() => setJobStatusFilter('shortlisted')}>Shortlisted</button>
                                </div>
                                <div className=''>
                                    <button type='button' className={jobStatusFilter == 'interviewing' ? 'btn button-inside job-status-clicked' : 'btn button-inside'} onClick={() => setJobStatusFilter('interviewing')}>Interviewing</button>
                                </div>
                                <div className=''>
                                    <button type='button' className={jobStatusFilter == 'selected' ? 'btn button-inside job-status-clicked' : 'btn button-inside'} onClick={() => setJobStatusFilter('selected')}>Selected</button>
                                </div>
                                <div className=''>
                                    <button type='button' className={jobStatusFilter == 'rejected' ? 'btn button-inside job-status-clicked' : 'btn button-inside'} onClick={() => setJobStatusFilter('rejected')}>Rejected</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='card-jobs'>
                    <CardJobsStatus jobStatusFilter={jobStatusFilter} />
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}