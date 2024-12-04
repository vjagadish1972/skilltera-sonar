import react, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import './filter.css'
import { GetAllCompanyList } from '../../../Redux/Reducer/companyListReducerSlice';
import { selectFilterDataJob } from '../../../Redux/Reducer/filterDataJobReducerSlice';
import jobDataByIdReducer, { selectJobDataByIdelection } from '../../../Redux/Reducer/jobDataByIdReducer';

export default function Filter() {
    const dispatch = useDispatch()
    // const jobRoleSelection = useSelector(
    //     (state) => state.jobRole
    // );

    const companyListSelection = useSelector(
        (state) => state.companyList
    )
    // const [jobRoleColor, setJobRoleColor] = useState({
    //     backgroundColor: '',
    //     color: ''
    // })
    const [companyColor, setCompanyColor] = useState({
        backgroundColor: '',
        color: ''
    })
    const [experienceColor, setExperienceColor] = useState({
        backgroundColor: '',
        color: ''
    })
    const [jobtypeColor, setJobTypeColor] = useState({
        backgroundColor: '',
        color: ''
    })
    // const [onsiteColor, setOnsiteColor] = useState({
    //     backgroundColor: '',
    //     color: ''
    // })

    const [filterData, setFilterData] = useState({
        // jobRole: '',
        company: '',
        experience: { min: '', max: '' },
        jobType: '',
        // onsite: '',
    })

    useEffect(() => {
        dispatch(GetAllCompanyList())
    }, [])

    // const handleJobRoleChange = (e) => {
    //     setJobRoleColor({ backgroundColor: '#ff8c04', color: 'white' })
    //     setFilterData({
    //         ...filterData,
    //         'jobRole': e.target.value
    //     })
    // }
    const handleCompanyChange = (e) => {
        setCompanyColor({ backgroundColor: '#ff8c04', color: 'white' })
        setFilterData({
            ...filterData,
            'company': e.target.value
        })
    }
    const handleExperienceChange = (e) => {
        setExperienceColor({ backgroundColor: '#ff8c04', color: 'white' })
        setFilterData({
            ...filterData,
            'experience': {
                min: Number(e.target.value.split('-')[0]),
                max: Number(e.target.value.split('-')[1])
            }
        })
    }
    const handleJobTypeChange = (e) => {
        setJobTypeColor({ backgroundColor: '#ff8c04', color: 'white' })
        setFilterData({
            ...filterData,
            'jobType': e.target.value
        })
    }
    // const handleOnsiteChange = (e) => {
    //     setOnsiteColor({ backgroundColor: '#ff8c04', color: 'white' })
    //     setFilterData({
    //         ...filterData,
    //         'onsite': e.target.value
    //     })
    // }

    const applyChanges = () => {
        dispatch(selectFilterDataJob(filterData))
        dispatch(selectJobDataByIdelection(''))
    }

    const filterReset = () => {
        // setJobRoleColor({ backgroundColor: '', color: '' })
        setCompanyColor({ backgroundColor: '', color: '' })
        setExperienceColor({ backgroundColor: '', color: '' })
        setJobTypeColor({ backgroundColor: '', color: '' })
        // setOnsiteColor({ backgroundColor: '', color: '' })
        // document.getElementById('job-role-select').value = ''
        document.getElementById('company-select').value = ''
        document.getElementById('experience-select').value = ''
        document.getElementById('job-type-select').value = ''
        // document.getElementById('onsite-select').value = ''
        setFilterData({ company: '', experience: { min: '', max: '' }, jobType: '' })
        dispatch(selectFilterDataJob(''))
        dispatch(selectJobDataByIdelection(''))
    }

    return (
        <>
            <div className='filter-block'>
                <div className='container'>
                    <div className='filter-inside-block'>

                        {/* <div className='job-role-select'>
                            <select
                                style={{
                                    backgroundColor: jobRoleColor.backgroundColor,
                                    color: jobRoleColor.color,
                                    width: '150px'
                                }}
                                className="form-select form-select-md"
                                id='job-role-select'
                                placeholder='Job Role'
                                onChange={handleJobRoleChange}>
                                <option value="">Job Role</option>
                                {jobRoleSelection.jobRoleList.data.map((item, key) => {
                                    return (
                                        <>
                                            <option key={key} value={item._id}>{item.role}</option>
                                        </>
                                    );

                                })}
                            </select>
                        </div> */}

                        <div className='company-select'>
                            <select
                                style={{
                                    backgroundColor: companyColor.backgroundColor,
                                    color: companyColor.color,
                                }}
                                id='company-select'
                                className="form-select form-select-md"
                                placeholder='Company Name'
                                onChange={handleCompanyChange}>
                                <option value="">Company Name</option>
                                {companyListSelection.companyList.data.map((item, index) => {
    return (
        <option key={`${item.companyName}-${index}`} value={item.companyName}>
            {item.companyName}
        </option>
    );
})}

                            </select>
                        </div>

                        <div className='experience-select'>
                            <select
                                style={{
                                    backgroundColor: experienceColor.backgroundColor,
                                    color: experienceColor.color,
                                }}
                                id='experience-select'
                                className="form-select form-select-md"
                                placeholder='experience'
                                onChange={handleExperienceChange}>
                                <option value="">Experience Level</option>
                                <option value="0-5">0 - 5 years</option>
                                <option value="5-10">5 - 10 years</option>
                                <option value="10-15">10 - 15 years</option>
                            </select>
                        </div>

                        <div className='job-type-select'>
                            <select
                                style={{
                                    backgroundColor: jobtypeColor.backgroundColor,
                                    color: jobtypeColor.color,
                                }}
                                id='job-type-select'
                                className="form-select form-select-md"
                                placeholder='jobType'
                                onChange={handleJobTypeChange}>
                                <option value="">Job Type</option>
                                <option value="fulltime">Full Time</option>
                                <option value="parttime">Part Time</option>
                                <option value="c2c">C2C</option>
                                <option value="c2h">C2H</option>
                            </select>
                        </div>

                        {/* <div className='onsite-select'>
                            <select
                                style={{
                                    backgroundColor: onsiteColor.backgroundColor,
                                    color: onsiteColor.color,
                                }}
                                id="onsite-select"
                                className="form-select form-select-md"
                                placeholder='Onsite/Remote'
                                onChange={handleOnsiteChange}>
                                <option value="" >Onsite/Remote</option>
                                <option value="onsite">Onsite</option>
                                <option value="remote">Remote</option>

                            </select>
                        </div> */}

                        <div style={{ borderLeft: '2px solid black', }}></div>

                        <div className="group-button" role="group" aria-label="Basic example">
                            <button type="button" className='active-apply-btn' onClick={applyChanges}>Show Results</button>
                            <button type="button" className="reset-btn" onClick={filterReset}>Reset</button>
                        </div>

                    </div>


                </div>
            </div>
        </>
    )
}