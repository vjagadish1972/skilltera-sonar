import "./sidebar.css";
import React, { useState, useEffect } from "react";
//components
import SearchBar from "../SearchBar";
//APIs
import { getClientJobs } from "../../../Services/API/client.api";
//assets
import { MdOutlineStar } from "react-icons/md";
import { useDispatch } from "react-redux";
import { selectJobNameSelection } from "../../../Redux/Reducer/jobNameSelectionSlice";
const Sidebar = ({ selectJob, filterData }) => {
    const [searchValue, setSearchValue] = useState("");
    const [allJobs, setJobs] = useState([]);
    const [auxJobList, setAuxJobList] = useState([]);
    const [selectedJobID, setSelectedJobID] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [jobName, setJobName] = useState('')
    let showFilters = false;
    const dispatch = useDispatch();
    useEffect(() => {
        const fetchJobs = async () => {
            const JobResponse = await getClientJobs();
            if (JobResponse?.status === 200) {
                setJobs(JobResponse.data.jobs);
                setAuxJobList(JobResponse.data.jobs);
                //default job selection
                if (JobResponse.data.jobs.length > 0) {
                    selectJob(JobResponse.data.jobs[0]);
                    setSelectedJobID(JobResponse.data.jobs[0]._id);
                    dispatch(selectJobNameSelection(JobResponse.data.jobs[0].jobTitle))
                }
                setLoading(false);
            }
        };
        fetchJobs();
    }, []);
    function searchJobs(searchStr) {
        if (searchStr.length === 0) {
            setJobs(auxJobList);
        } else {
            let temp = auxJobList;
            const filtered = temp.filter((job) => {
                console.log(job.jobTitle);
                if (
                    job.jobTitle.toLowerCase().includes(searchStr.toLowerCase())
                ) {
                    return job;
                }
            });

            setJobs(filtered);
        }
    }
    if (
        filterData.searchedSkills.length > 0 ||
        filterData.jobType.length > 0 ||
        parseInt(filterData.minExp) > 0 ||
        parseInt(filterData.maxExp) > 0
    ) {
        showFilters = true;
    }

    return (
        <div className="company_sidebar">
            {showFilters && (
                <div
                    className="company__job_card"
                    style={{ border: "1px solid #D8EAF7" }}
                >
                    {filterData.searchedSkills.length > 0 && (
                        <div className="company__job_card__skill_section">
                            <p>Skills Selected</p>
                            <div className="skill_section__skills_chips">
                                {filterData.searchedSkills.map((skill) => (
                                    <span
                                        className="skill_section__skills_chip"
                                        style={{
                                            display: "flex",
                                            gap: "0.85rem",
                                        }}
                                        key={skill}
                                    >
                                        <p>{skill.label}</p>
                                        <span className="chip_star">
                                            {skill.ratingValue}
                                            <MdOutlineStar />
                                        </span>
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                    {filterData.jobType.length > 0 && (<div style={{ display: "flex", gap: "1rem" }}>
                        <div className="company__job_card__skill_section">
                            <p>Job Type</p>
                            <div className="skill_section__skills_chips">
                                <span
                                    className="skill_section__skills_chip"
                                    style={{
                                        display: "flex",
                                        gap: "0.85rem",
                                    }}
                                >
                                    <p>{filterData.jobType + " "}</p>
                                </span>
                            </div>
                        </div>

                    </div>)}
                    <div style={{ display: "flex", gap: "1rem" }}>
                        {filterData.minExp.length > 0 && (<div className="company__job_card__skill_section">
                            <p>Min experience</p>
                            <div className="skill_section__skills_chips">
                                <span
                                    className="skill_section__skills_chip"
                                    style={{
                                        display: "flex",
                                        gap: "0.85rem",
                                    }}
                                >
                                    <p>{filterData.minExp + " "} Years</p>
                                </span>
                            </div>
                        </div>)}
                        {filterData.maxExp.length > 0 && (<div className="company__job_card__skill_section">
                            <p>Max experience</p>
                            <div className="skill_section__skills_chips">
                                <span
                                    className="skill_section__skills_chip"
                                    style={{
                                        display: "flex",
                                        gap: "0.85rem",
                                    }}
                                >
                                    <p>{filterData.maxExp + " "} Years</p>
                                </span>
                            </div>
                        </div>)}
                    </div>
                </div>
            )}
            <SearchBar
                value={searchValue}
                onChange={(value) => {
                    setSearchValue(value);
                    searchJobs(value);
                }}
            />
            {isLoading ? (
                <div className="company_sidebar__jobs_col">
                    <p>Loading Jobs...</p>
                </div>
            ) : (
                <div className="company_sidebar__jobs_col">
                    {allJobs.length > 0 ? (
                        allJobs.map((job) => {
                            let selected = false;
                            if (job._id === selectedJobID) {
                                selected = true;
                            }
                            return (
                                <JobCard
                                    selectedFlag={selected}
                                    data={job}
                                    key={job._id}
                                    onClick={() => {
                                        selectJob(job);
                                        setSelectedJobID(job._id);
                                        dispatch(selectJobNameSelection(job.jobTitle))
                                    }}
                                />
                            );
                        })
                    ) : (
                        <p>No Jobs</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Sidebar;

const JobCard = ({ data, onClick, selectedFlag }) => {
    const targetDate = new Date(data.postedOn);
    const currentDate = new Date();
    const timeDiff = currentDate - targetDate;
    const daysPassed = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return (
        <div
            className={
                selectedFlag
                    ? "company__job_card selected"
                    : "company__job_card"
            }
            onClick={onClick}
        >
            <div className="company__job_card__header">
                <p>{data.jobTitle}</p>
                <p>{data.city}</p>
            </div>
            <div className="company__job_card__skill_section">
                <p>Skills Required</p>
                <div className="skill_section__skills_chips">
                    {data.skillRequired.map((skill) => (
                        <span
                            className="skill_section__skills_chip"
                            key={skill._id}
                        >
                            {skill.skillId.skill}
                        </span>
                    ))}
                </div>
            </div>
            <div className="company__job_card__skill_section">
                <p>Job Type</p>
                <div className="skill_section__skills_chips">
                    <span className="skill_section__skills_chip">
                        {data.jobType}
                    </span>
                </div>
            </div>
            <p>Post {daysPassed} Day(s) ago</p>
        </div>
    );
};
