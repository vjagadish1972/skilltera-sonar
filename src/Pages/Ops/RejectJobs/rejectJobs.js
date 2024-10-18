import React, { useEffect, useState, useContext } from 'react'
import { BiEdit } from "react-icons/bi";
import { useForm } from "react-hook-form";
import Swal from 'sweetalert2';
import { AiOutlineCloseCircle } from "react-icons/ai"
import JobCard from '../../../Component/JobCard/jobCard'
import { Rating } from 'react-simple-star-rating';
import { MdDelete } from "react-icons/md";
import ApiConstants from '../../../Services/apiconstants'
import axios from 'axios'
import './rejectJobs.css'
import $ from "jquery";
import { opsContext } from '../../../Context/opsContextState';


const RejectedJob = () => {

  const {
    register,
    handleSubmit,
    reset
  } = useForm();

  const { rejectedJobs, skillList, updateSkillListData } = useContext(opsContext)

  const [jobList, setJobList] = useState(rejectedJobs)

  const [id, setId] = useState("");
  const [token, setToken] = useState()
  const [companyIds, setCompanyIds] = useState()
  const [jobRoleId, setJobRoleId] = useState()
  const [newSkill , setNewSkill] = useState('')
  const [formValue, setformValue] = useState({
    id: "",
    jobTitle: "",
    companyId: "",
    companyName: "",
    jobRole: "",
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

  const [addSkill, SetAddSkill] = useState([]);
  const [skillQuery, setSkillQuery] = useState('');



  const addNewSkill = (data) => {
    const newElement = data.searchSkill;
    let obj = skillList.find(o => o.skill === newElement);
    // {_id: '62d1d45e87ae97aeba81b090', skill: 'Business Law', active: true}
    SetAddSkill(addSkill => [...addSkill, { skillId: obj._id, skillName: newElement, rating: 0 }])
  }

  const handleRemoveItem = (i) => {
    SetAddSkill(addSkill.filter(item => item.skill !== i))
    SetAddSkill(addSkill.filter(item => item.skillId.skill !== i))
  };



  const handleChangeExp = (event, idx) => {
    const newValue = event.target.value
    addSkill[idx].requiredExperience = newValue
  }

  const handleChange = (event) => {
    setformValue({
      ...formValue,
      [event.target.name]: event.target.value
    });
  }

  const handleRating = (rate, idx) => {
    const label = 'rating'
    const newValue = rate
    SetAddSkill([
      ...addSkill.slice(0, idx),
      {
        // here update data value
        ...addSkill[idx],
        [label]: newValue,
      },
      ...addSkill.slice(idx + 1),
    ]);
  }

  const handleJobDesc = (data) => {
    setformValue({
      id: data._id,
      jobTitle: data.jobTitle,
      companyId: data.companyId,
      companyName: data.companyId.companyName,
      country: data.country,
      jobRole: data.jobRole.role,
      state: data.state,
      city: data.city,
      jobType: data.jobType,
      workExperience: data.workExperience,
      jobDescription: data.jobDescription,
      jobId: data.jobId,
      lastDate: data.lastDate,
      postedOn: data.postedOn,
      isApproved: data.isApproved,
      travelRequired: data.travelRequired,
      skillRequired: data.skillRequired
    })

    SetAddSkill(data.skillRequired)
  }


  const onSubmitNewSkill = (event) => {

    event.preventDefault();

    const skillFound = skillList.some((obj) => obj.skill === newSkill);

    if (skillFound === false) {
      axios
        .post(ApiConstants.SKILL_ADD, {
          newSkill: newSkill
        },
          {

            headers: {
              Accept: "application/json",
              "Content-type": "application/json",
              token: token,
              id: id,
              "Access-Control-Allow-Origin": true,
              "Access-Control-Allow-Methods": "GET, POST, PATCH",
            }

          })
        .then((res) => {

          Swal.fire({
            title: res.data.message,
            icon: "success",
            width: 400,
            height: 100,
          });


          updateSkillListData({ _id: res.data.skill._id, skill: res.data.skill.skill, active: true });

        })
        .catch((error) => {
          Swal.fire({
            title: error.message,
            icon: "error",
            width: 400,
            height: 100,
          });
        });
    } else {
      Swal.fire({
        title: "skill already exist",
        icon: "error",
        width: 400,
        height: 100,
      })

    }

  }

  const onSubmit = () => {
    axios.patch(ApiConstants.UPDATE_JOB + formValue.id, {
      companyId: companyIds,
      jobId: formValue.jobId,
      jobTitle: formValue.jobTitle,
      jobRole: jobRoleId,
      workExperience: formValue.workExperience,
      jobType: formValue.jobType,
      travelRequired: formValue.travelRequired,
      country: formValue.country,
      state: formValue.state,
      city: formValue.city,
      postedOn: formValue.postedOn,
      lastDate: formValue.lastDate,
      jobDescription: formValue.jobDescription,
      skillRequired: addSkill
    }
      , {
        headers: {
          Accept: "application/json",
          "Content-type": "application/json",
          token: token,
          _id: id,
          "Access-Control-Allow-Origin": true,
          "Access-Control-Allow-Methods": "GET, POST, PATCH",
        }
      }).then((response) => {
        Swal.fire({
          title: "Updated successful ",
          icon: "success",
          allowOutsideClick: true,
          allowEscapeKey: true,
          allowEnterKey: true,
          confirmButtonText: "Ok",
        });
        reset()
        SetAddSkill([])
        setTimeout(() => {
          $("[data-dismiss=modal]").trigger({ type: "click" })
        }, 1000)
      }).catch((error) => {
        Swal.fire({
          title: "Backend not connected",
          icon: "info",
          width: 400,
          height: 100,
        });
      })
  }


  $(function () {
    $('input[name=companyIds]').on('input', function () {
      var selectedOption = $('option[value="' + $(this).val() + '"]');
      setCompanyIds(selectedOption.length ? selectedOption.attr('id') : "");
    });
  });

  $(function () {
    $('input[name=jobRoleId]').on('input', function () {
      var selectedOption = $('option[value="' + $(this).val() + '"]');
      setJobRoleId(selectedOption.length ? selectedOption.attr('id') : "");
    });
  });


  useEffect(() => {

    setId(JSON.parse(sessionStorage.getItem("ops_data")).admin._id);
    setToken(JSON.parse(sessionStorage.getItem("ops_token")));

  }, [token])

  useEffect(() => {
    if (jobList.length > 0) {
      setformValue({
        id: jobList[0]._id,
        jobTitle: jobList[0].jobTitle,
        companyId: jobList[0].companyId,
        companyName: jobList[0].companyId.companyName,
        country: jobList[0].country,
        state: jobList[0].state,
        city: jobList[0].city,
        jobType: jobList[0].jobType,
        jobRole: jobList[0].jobRole.role,
        jobDescription: jobList[0].jobDescription,
        jobId: jobList[0].jobId,
        workExperience: jobList[0].workExperience,
        lastDate: jobList[0].lastDate,
        postedOn: jobList[0].postedOn,
        isApproved: jobList[0].isApproved,
        travelRequired: jobList[0].travelRequired,
        skillRequired: jobList[0].skillRequired
      })
      SetAddSkill(jobList[0].skillRequired)
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
              })
                : ""}
            </div>
            <div className="col-lg-7 ">
              <div className='descBox'>
                <div className='jobTitle'>
                  <div className='jobTitleBox'>
                    <div className='d-flex justify-content-between'>
                      <p style={{ fontSize: '1.2rem', fontWeight: '500' }} >{formValue.jobTitle || "FullStack Developer"}</p>
                      <button type="button" className="btn edtBtn" data-toggle="modal" data-target={`.recommendation${formValue.id}`}>
                        <BiEdit size={25} color={"#FF8C04"} />
                      </button>

                      <div className={`modal fade recommendation${formValue.id}`} tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div className="modal-dialog modal-lg">
                          <div className="modal-content modalContent">
                            <div className="modal-header">
                              <p className="modal-title  " id="exampleModalLongTitle">Edit Job </p>
                              <button type="button" className="btn" data-dismiss="modal" aria-label="Close">
                                <AiOutlineCloseCircle />
                              </button>
                            </div>
                            <div className="modal-body">
                              <form className="" onSubmit={handleSubmit(onSubmit)}>
                                <div className="row m-4">
                                  <div className="form-group col-md-6">
                                    <label >CompanyName</label>
                                    <input type="text"
                                      className="form-control"
                                      name="companyName"
                                      list="job-options"
                                      value={formValue.companyName}
                                    />
                                    {/* <datalist id="job-options">
                                      {companies.length > 0 ? companies.map((option, index) => (
                                        <option key={index} value={option.companyName} id={option._id} />
                                      )) : ""}
                                    </datalist> */}
                                  </div>
                                  <div className="form-group col-md-6">
                                    <label for="inputCity">Job id</label>
                                    <input type="text" className="form-control"
                                      name="jobId"
                                      value={formValue.jobId}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>

                                <div className="row m-4">
                                  <div className="form-group col-md-6">
                                    <label for="inputCity">Job title</label>
                                    <input type="text" className="form-control"
                                      name="jobTitle"
                                      value={formValue.jobTitle}
                                      onChange={handleChange}
                                    />
                                  </div>

                                  <div className="form-group col-md-6">
                                    <label for="inputCity">Job Role</label>
                                    <input type="text" className="form-control"
                                      placeholder="Type of Role you are looking for*"
                                      name='jobRoleId'
                                      list="jobRole-option"
                                      value={formValue.jobRole}
                                    />
                                    {/* <datalist id="jobRole-option" >
                                      {jobRoleSelection.jobRoleList.data.map((d, i) => {
                                        return (
                                          <>
                                            <option key={i} value={d.role} id={d._id} />
                                          </>
                                        );
                                      })}
                                    </datalist> */}
                                  </div>
                                </div>

                                <div className="row m-4">
                                  <div className="form-group col-md-4">
                                    <label for="inputCity">Year Of Experience</label>
                                    <input type="number" min={0} className="form-control"
                                      name="workExperience"
                                      value={formValue.workExperience}
                                      onChange={handleChange}
                                    />
                                  </div>

                                  <div className="form-group col-md-4">
                                    <label for="inputCity">Job Type</label>
                                    <select
                                      className="form-control"
                                      required
                                      name="typeOfJob"
                                      value={formValue.jobType}
                                      onChange={handleChange}
                                    >
                                      <option value="Fulltime"> Fulltime</option>
                                      <option value="C2C"> C2C </option>
                                      <option value="C2H"> C2H </option>
                                      <option value="Parttime"> Parttime </option>
                                      <option value="internship">Internship</option>
                                      <option value="freelance">Freelance</option>
                                    </select>
                                  </div>

                                  <div className="form-group col-md-4">
                                    <label for="inputCity">Travel Required</label>
                                    <select className="form-control"
                                      name="travelRequired"
                                      value={formValue.travelRequired}
                                      onChange={handleChange}
                                    >
                                      <option value="true"> Yes</option>
                                      <option value="false"> No</option>
                                    </select>
                                  </div>


                                </div>


                                <div className="row m-4">
                                  <div className="form-group col-md-4">
                                    <label for="inputCity">Country</label>
                                    <input type="text" className="form-control"
                                      name="country"
                                      value={formValue.country}
                                      onChange={handleChange}
                                    />
                                  </div>

                                  <div className="form-group col-md-4">
                                    <label for="inputCity">State</label>
                                    <input type="text" className="form-control" id="inputCity"
                                      name="state"
                                      value={formValue.state}
                                      onChange={handleChange}
                                    />
                                  </div>

                                  <div className="form-group col-md-4">
                                    <label for="inputCity">City</label>
                                    <input type="text" className="form-control" id="inputCity"
                                      name="city"
                                      value={formValue.city}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>

                                <div className="row m-4">
                                  <div className="form-group col-md-6">
                                    <label for="inputCity">PostedOn</label>
                                    <input type="date" className="form-control" name='postedOn'
                                      onChange={handleChange} defaultValue={formValue.postedOn}
                                    />
                                  </div>

                                  <div className="form-group col-md-6">
                                    <label for="inputCity">End Date</label>
                                    <input type="date" className="form-control" name="lastDate"
                                      onChange={handleChange} defaultValue={formValue.lastDate}
                                    />
                                  </div>
                                </div>

                                <div className="row m-4">
                                  <div className="form-group ">
                                    <label for="inputCity">Job Description</label>

                                    <p className='p-2 border' style={{ alignContent: 'justify', textAlign: 'justify' }} dangerouslySetInnerHTML={{ __html: formValue.jobDescription }}>
                                    </p>
                                    <textarea className="form-control" rows="5"
                                      name="jobDescription"
                                      value={formValue.jobDescription}
                                      onChange={handleChange}
                                    />
                                  </div>
                                </div>


                                <div className="row d-flex justify-content-center">
                                 
                                    <button className="buttonSend"
                                       type='button'
                                      style={{ background: "var(--list-item-color)" }}
                                      data-toggle="modal"
                                      data-target="#addNewSkill"
                                    > Add New Skill  </button>
                                 
                                </div>

                                <div className="row m-4">
                                  <div className="col-md-12 col-sm-12 mt-3 ">

                                    {/* skill adding  start*/}
                                    <span className >Add Skills* </span>
                                    <div className="form-group has-search-for-filter">
                                      <span className="fa fa-search form-control-feedback-for-filter"></span>
                                      <div className="input-group mb-3">
                                        <input type="text" list="data" className="form-control"
                                          placeholder="Search" aria-label="Recipient's username"
                                          aria-describedby="basic-addon2"
                                          {...register("searchSkill")}
                                          required />
                                        <datalist id="data">
                                          {skillList.length != 1 && skillList.slice(1, skillList.length).map((item, key) => {
                                            if (item.skill.toUpperCase().includes(skillQuery.toUpperCase())) {
                                              return (
                                                <>
                                                  <option key={key} value={item.skill} />

                                                </>
                                              )
                                            }
                                          })}
                                        </datalist>
                                        <div className="input-group-append  mx-1">
                                          <button className="btn addSkillBtn" onClick={handleSubmit(addNewSkill)} >Add</button>
                                        </div>

                                      </div>
                                    </div>

                                    {
                                      addSkill.length > 0
                                        ? <div className="border">
                                          {
                                            addSkill.map((e, i) => {

                                              return (
                                                <div className='d-flex justify-content-between m-3 '>
                                                  <div className="col-md-2 col-sm-2" >
                                                    <span className='same-formating'> {e.skillId.skill} {e.skillName} </span>
                                                  </div>
                                                  <div>
                                                    <input className="rounded border-light"
                                                      placeholder="Experience (in year)"
                                                      onChange={(e) => { handleChangeExp(e, i) }}
                                                      defaultValue={e.requiredExperience}
                                                      name="skillExp"
                                                      type="number"
                                                      required
                                                      min="0"
                                                    />
                                                  </div>
                                                  <div>
                                                    <Rating id={i} initialValue={e.rating > 0 ? e.rating : 0} onClick={(rate) => handleRating(rate, i)} fillColor='#4B2DFF' size='23px' />
                                                  </div>

                                                  <div>
                                                    <MdDelete size={25} onClick={() => handleRemoveItem(e.skill === undefined || e.skill === null ? e.skillId.skill : e.skill)} style={{ 'cursor': 'pointer' }} />
                                                  </div>

                                                </div>
                                              );
                                            })} </div> : ''
                                    }

                                  </div>
                                </div>
                                <div className="d-flex justify-content-center">
                                  <button type="submit" className="btn m-3 addSkillBtn "> Update Job  </button>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>

                    <p>{formValue.companyId.companyName}. {formValue.companyId.companyName}  <span style={{ color: "#FF8C04", fontSize: '11px', marginLeft: '1rem' }}>1 Day ago </span> </p>
                    <p style={{ fontSize: '0.8rem' }}>Job type ({formValue.jobType} )</p>
                    {/* <p style={{ fontSize: '0.8rem' }} >50% match with your profile</p> */}
                    <button className="btnJobApply" disabled={formValue.isApproved === false ? 'disabled' : null}
                      style={formValue.isApproved === false ? { backgroundColor: "white", color: "black" } : { backgroundColor: "red", color: "white" }}
                    >Rejected</button>
                  </div>
                </div>

                <div className='jobDesc'>

                  <p style={{ alignContent: 'justify', textAlign: 'justify' }}
                    dangerouslySetInnerHTML={{ __html: formValue.jobDescription }}
                  >
                  </p>
                </div>

              </div>
            </div>
          </div>
        </div>
        : <h1 className='text-center text-secondary'>No Rejected Job</h1>}



      {/* modal addNewSkill */}

      <div
        className="modal fade"
        id="addNewSkill"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content modalContent">
            <div className="modal-header">
              <h5 className="modal-title mx-3" id="exampleModalLongTitle">
                Add New skill
              </h5>
              <button
                type="button"
                className="btn"
                data-dismiss="modal"
                aria-label="Close"
              >
                <AiOutlineCloseCircle />
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={onSubmitNewSkill}>
                <div className="row m-3 ">
                  <label className="labelPos">Add New Skill </label>
                  <input type="text"
                    className="form-control"
                    placeholder="Enter Skill"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-center mt-3 mb-3">
                  <button
                    type="submit"
                    className="buttonSend me-md-2"
                    style={{ background: "var(--list-item-color)" }}>
                    Save
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default RejectedJob