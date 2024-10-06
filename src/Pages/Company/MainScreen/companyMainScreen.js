import React, { useState, useEffect } from "react";
import "./companyMainScreen.css";
//components
import CompanyLayout from "../Layout";
import { Button } from "../../../Component/Common/Button/Button";
import Sidebar from "../Sidebar";
import Modal from "../../../Component/Common/Modal";

import SectionLoading from "../../../Component/Common/SectionLoading";
import FilterComponent from "../FilterModal/index";
//Assets
import { IoSearch } from "react-icons/io5";
import { FaFilter } from "react-icons/fa";
//APIs
import {
    deleteCandidateSelection,
    getCandidateListByJobId,
    getCandidateSelection,
    postCandidateSelection,
} from "../../../Services/API/client.api";
import CreateChat from "../Create Chat/createChat";
import { useSelector } from "react-redux";
export default function CompanyMainScreen() {
    const [localUI, setLocalUI] = useState({
        viewBy: "all",
        isModalOpen: false,
        selectJobId: null,
    });
    const [isLoadingCandidates, setIsLoadingCandidates] = useState(false);
    const [candidateList, setCandidateList] = useState([]);
    const [deleteButton, setDeleteButton] = useState(true)
    const [filterData, setFilterdata] = useState({
        minExp: 0,
        maxExp: 0,
        jobType: '',
        searchedSkills: [],
    });
    const [refreshApi, setRefreshApi] = useState(false)

    const closeModal = () => {
        setLocalUI({
            ...localUI,
            isModalOpen: false,
        });
    };
    const updateFilterData = (obj) => {
        setFilterdata(obj);
    };
    const deleteCallBack = () => {
        setDeleteButton(!deleteButton)
    }

    useEffect(() => {
        async function fetchCandidates() {
            let response = {};
            let reqData = filterData;
            if (localUI.viewBy === "all") {
                response = await getCandidateListByJobId(
                    localUI.selectJobId,
                    reqData
                );
                if (response.status === 200) {
                    setCandidateList(response.data.rankedCandidates);
                    setIsLoadingCandidates(false);
                }
            } else {
                response = await getCandidateSelection(
                    localUI.viewBy,
                    localUI.selectJobId
                );

                if (response.status === 200) {
                    let flattenedRes = [];
                    for (let i = 0; i < response.data.selections.length; i++) {
                        const obj1 = response.data.selections[i]._id
                        const obj2 = response.data.selections[i].candidateId
                        obj2['selectionKey'] = obj1
                        flattenedRes.push(
                            // response.data.selections[i].candidateId
                            obj2
                        );
                    }
                    setCandidateList(flattenedRes);
                    setIsLoadingCandidates(false);
                }
            }
        }
        if (localUI.selectJobId !== null) {
            setIsLoadingCandidates(true);
            fetchCandidates();
        }
    }, [localUI.selectJobId, localUI.viewBy, filterData, deleteButton, refreshApi]);

    return (
        <CompanyLayout>

            {localUI.isModalOpen ? (
                <Modal setModalClose={closeModal}>
                    <FilterComponent
                        closeComp={closeModal}
                        prefillData={filterData}
                        updateFilterData={updateFilterData}
                        refreshApi={refreshApi}
                        setRefreshApi={setRefreshApi}
                    />
                </Modal>
            ) : null}
            <div className="company_container">
                {/* Sidebar */}
                <Sidebar
                    selectJob={(job) => {
                        setLocalUI({
                            ...localUI,
                            selectJobId: job?._id,
                        });
                    }}
                    filterData={filterData}
                />
                {/* Main Content */}
                <div className="company__main_content ">
                    {/* Row to filter candidates */}
                    <div className="control_row">
                        {controlButtons.map((item) => {
                            let active =
                                localUI.viewBy === item.key ? "active" : "";
                            return (
                                <button
                                    onClick={() =>
                                        setLocalUI({
                                            ...localUI,
                                            viewBy: item.key,
                                        })
                                    }
                                    key={item.id}
                                    className={`control_button ${active}`}
                                >
                                    {item.name}
                                </button>
                            );
                        })}
                    </div>
                    {/* Search Bar Row */}
                    <div className="company_search_bar">
                        <IoSearch />
                        <input
                            type="text"
                            placeholder="Search by name, skills, job title, etc."
                        />
                        <span
                            onClick={() =>
                                setLocalUI({
                                    ...localUI,
                                    isModalOpen: true,
                                })
                            }
                        >
                            <p>Advance Filter</p>
                            <FaFilter />
                        </span>
                    </div>
                    {/* Main Section - Job Card listings */}

                    {isLoadingCandidates ? (
                        <div className='company_job_cards-parent-loader'>
                            <SectionLoading />
                        </div>
                    ) : (
                        <div className='company_job_cards-parent'>
                            <div className="company_job_cards">
                                {candidateList.length > 0 ? (
                                    candidateList.map((candidate) => (
                                        < JobCard
                                            key={candidate?._id}
                                            selectedJobId={localUI.selectJobId}
                                            data={candidate}
                                            candidateId={candidate._id}
                                            selectionStatus={localUI.viewBy}
                                            deleteCallBack={deleteCallBack}
                                        />
                                    ))
                                ) : (
                                    <p>No Candidates</p>
                                )}
                            </div>
                        </div>
                    )}

                </div>
            </div>


        </CompanyLayout>
    );
}

const JobCard = ({ selectedJobId, data, candidateId, selectionStatus, deleteCallBack }) => {
    const jobName = useSelector((state) => state.jobNameSelection);
    const [localUI, setLocalUI] = useState({
        quickAction: "",
    });
    const [createChatShow, setCreateChatshow] = useState({
        active: false,
        id: '',
        fullName: ''
    })
    const closeCreateChatModal = () => {
        setCreateChatshow({ active: !createChatShow.active, id: '', fullName: '' })
    }
    async function saveQuickAction(_candidateId, action, name) {
        if (action != 'Chat') {
            let reqData = {
                status: action,
                candidateId: _candidateId,
                jobId: selectedJobId,
            };

            const response = await postCandidateSelection(reqData);
        } else {
            setCreateChatshow({ active: !createChatShow.active, id: _candidateId, name: name });

        }
    }
    const openURLInNewTab = () => {
        window.open(`/company/candidate/${candidateId}`, '_blank');
    }
    async function deleteCandidateSelectionById(id) {
        await deleteCandidateSelection(id)
        deleteCallBack()

    }


    return (
        <>
            <div className="job_card">
                {/* Quick Action Section */}
                <div className="job_card__row_1">
                    <span className="job_card__quick_action_container">
                        {["Shortlist", "Interview", "Selected", "Rejected", "Chat"].map(
                            (item) => {
                                let _bgColor = "#d8eaf7";
                                let _fontWeight = "400";
                                if (localUI.quickAction === item) {
                                    _fontWeight = "600";
                                    _bgColor = "#fff";
                                }
                                return (
                                    <Button
                                        key={item}
                                        text={item}
                                        buttonType="quick_action"
                                        height="2.5rem"
                                        width="max-content"
                                        fontsize="0.875rem"
                                        fontweight={_fontWeight}
                                        bgcolor={_bgColor}
                                        onClick={() => {
                                            setLocalUI({
                                                ...localUI,
                                                quickAction: item,
                                            });
                                            saveQuickAction(data?._id, item, data?.fullname);
                                        }}
                                    />
                                );
                            }
                        )}
                    </span>
                    {data?.isApplied ? <span className="applied-label">Applied
                        <span><i class="fa fa-check-circle-o" aria-hidden="true"></i></span>
                    </span> : ''}

                    {selectionStatus != 'all' && <span className="delete-button" onClick={() => deleteCandidateSelectionById(data.selectionKey)}><i class="fa fa-trash" aria-hidden="true"></i></span>}
                </div>
                {/* Details Section */}
                <div className="job_card__row_2">
                    <div className="job_card__description">
                        {/* SKills */}
                        <div>
                            <p className="job_card__label_span">SKILLS</p>
                            <span className="job_card__skill_values">
                                {data?.skills.length > 0 ? (
                                    data?.skills.map((skill) => (
                                        <span className="job_card__skill">
                                            <p>{skill.skillId.skill}</p>
                                            <StarRating
                                                ratingValue={Math.trunc(
                                                    skill.rating
                                                )}
                                                disable={true}
                                            />
                                        </span>
                                    ))
                                ) : (
                                    <p>No Skills</p>
                                )}
                            </span>
                        </div>
                        {/* Experience */}
                        <div>
                            <p className="job_card__label_span">EXPERIENCE</p>
                            <span className="job_card__values">
                                {data?.overallExperience} Years
                            </span>
                        </div>
                        <div>
                            <p className="job_card__label_span">CURRENT ROLE</p>
                            <span className="job_card__values">
                                {data?.currentRole || "NA"}
                            </span>
                        </div>
                        <div>
                            <p className="job_card__label_span">CLIENTS/COMPANY</p>
                            <span className="job_card__values">
                                {data?.previousEmployers?.map((employer) => (
                                    <p className="job_card__employer">{employer + ','}</p>
                                ))}
                            </span>
                        </div>
                        {/* <div>
                            <p className="job_card__label_span">EDUCATION</p>
                            <div className="job_card__values">

                                {data?.education.length > 0 ? data?.education[0].degree + ', ' + data?.education[0]?.major + ' (' + (data?.education[0]?.startDate)?.slice(0, 4) + ' - ' + (data?.education[0]?.endDate)?.slice(0, 4) + ') ' : 'NA'}
                                <br /> {data?.education.length > 0 ? <p>{data?.education[0].school}</p> : 'NA'}


                            </div>
                        </div> */}

                        <div className="job_card_type">
                            <div className="jobType">
                                <p className="job_card__label_span">JOB TYPE</p>
                                <span className="job_card__values">{data?.typeOfJob || "NA"}</span>
                            </div>
                            {data?.expectedRateC2CorC2H?.length}
                            {data?.expectedRateC2CorC2H?.length != 0 && data?.expectedRateC2CorC2H != undefined && <div className="jobSalary">
                                <p className="job_card__label_span">Expected Rate</p>
                                <span className="job_card__values">${data?.expectedRateC2CorC2H}/hr</span>
                            </div>}
                        </div>
                        {/* <div>
                            <p className="job_card__label_span">JOB TYPE</p>
                            <span className="job_card__values">{data?.typeOfJob || "NA"}</span>
                        </div> */}
                        {/* {data?.expectedRateC2CorC2H?.length > 0 ? <div>
                            <p className="job_card__label_span">Expected Rate</p>
                            <span className="job_card__values">`$${data?.expectedRateC2CorC2H}/hr`</span>
                        </div> : <div></div>} */}
                        <div className="d-flex justify-content-between">
                            <div>
                                <p style={{ color: "#246DA2" }}>{data?.candidateRating ? `${data?.candidateRating}% Match` : ''}</p>
                            </div>
                            <div>
                                <p style={{ color: "#246DA2" }} onClick={openURLInNewTab} > View full profile</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {createChatShow.active && <CreateChat
                handleShow={createChatShow.active}
                chatId={createChatShow.id}
                fullName={createChatShow.name}
                subject={jobName}
                closeCreateChatModal={closeCreateChatModal} />}
        </>
    );
};
const StarRating = ({ ratingValue = 0, disable = false }) => {
    const [rating, setRating] = useState(ratingValue);
    const handleClick = (value) => {
        if (!disable) {
            setRating(value);
        }
    };
    return (
        <div className="st__star-rating">
            {[1, 2, 3, 4, 5].map((value) => {
                let active = value <= rating ? true : false;
                return (
                    <span
                        key={value}
                        className={active ? "st__star active" : "st__star"}
                        onClick={() => handleClick(value)}
                    >
                        &#9733;
                    </span>
                );
            })}
        </div>
    );
};
const controlButtons = [
    {
        id: 1,
        name: "All Candidates",
        key: "all",
    },
    {
        id: 2,
        name: "Recommended",
        key: "recommended",
    },
    {
        id: 3,
        name: "Shortlisted",
        key: "shortlisted",
    },
    {
        id: 4,

        name: "Interviewing",
        key: "interviewed",
    },
    {
        id: 5,
        name: "Selected",
        key: "selected",
    },
    {
        id: 6,

        name: "Rejected",
        key: "rejected",
    },
    {
        id: 7,
        name: "Applied",
        key: "applied",
    },
];
