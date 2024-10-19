import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { trackPromise, usePromiseTracker } from "react-promise-tracker";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Loading from "../../Component/Loading/loading";
import { userContext } from "../../Context/userContextState";
import ApiConstants from "../../Services/apiconstants";
import Mixpanel from "../../Services/mixpanel";
import UserEditProfile from "../UserEditProfile/userEditProfile";
import { fileSizeValidate } from '../../UtilitiesFunctions/utilitiesFunction'
import './userProfile.css';
import { Interceptor } from "../../ErrorStatus/errorStatus";
import $ from "jquery";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BsPencil, BsPlusCircle } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { Rating } from 'react-simple-star-rating';
import StarRating from "../../Component/StarRating/starRating";
import { checkRequired, checkRequiredExp, checkSkillLength } from "../../UtilitiesFunctions/utilitiesFunction";
import UpdDelSkillUser from "./UpdDelSkill/updDelSkillUser";
import NavBarNew from "../../Component/NavBar New/navBarNew";
import AsyncSelect from 'react-select/async';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { GetAllSkills } from "../../Redux/Reducer/skillReducerSlice";
import { GetAllJobList } from "../../Redux/Reducer/jobRoleReducerSlice";
import { RxCrossCircled } from 'react-icons/rx'
import { GrAddCircle } from 'react-icons/gr';


const Profile = () => {

  const { userData, getData, resumeData, setResumeData } = useContext(userContext)

  const [description, setDescription] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
  ];

  const dispatch = useDispatch()

  if (sessionStorage.getItem('candidate_data') != null) {
    const candidateDataMix = JSON.parse(sessionStorage.getItem("candidate_data"))
    var mixpanelData = candidateDataMix.candidate.email;
    var token = candidateDataMix.token;
    var userId = candidateDataMix.candidate._id;
    var candidateEmailId = candidateDataMix.candidate.email;
  }

  if (sessionStorage.getItem('candidate_data_ref') != null) {
    const candidateDataMix = JSON.parse(sessionStorage.getItem("candidate_data_ref"))
    var mixpanelData = candidateDataMix.candidate.email;
    var token = candidateDataMix.token;
    var userId = candidateDataMix.candidate._id;
    var candidateEmailId = candidateDataMix.candidate.email;

  }

  const [selectedFile, setSelectedFile] = useState("");

  // const [editorState, setEditorState] = useState(() =>
  //   EditorState.createEmpty()
  // );

  const { promiseInProgress } = usePromiseTracker();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const [check, setCheck] = useState(false);

  const [liked, setLiked] = useState(false);

  const [show, setShow] = useState(false)

  const [suceccessMessage, setSuccessMessage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")

  const [expectedRate, setExpectedRate] = useState(true);
  const [addPreviousEmployer, setAddPreviousEmployer] = useState('');
  const [previousEmployersList, setPreviousEmployersList] = useState([])

  const jobRoleSelection = useSelector(
    (state) => state.jobRole
  );

  const checkData = () => {
    const emptyData = {
      phone: userData[0].candidate.phone || {},
      country: userData[0].candidate.country || {},
      currentCity: userData[0].candidate.currentCity || {},
      linkedInUrl: userData[0].candidate.linkedInUrl || {},
      relocation: userData[0].candidate.relocation || {},
      typeOfJob: userData[0].candidate.typeOfJob || {},
      timeToJoin: userData[0].candidate.timeToJoin || {},
      needVisaSponsorship: userData[0].candidate.needVisaSponsorship || {},
      expectedRateC2CorC2H: userData[0].candidate.expectedRateC2CorC2H || {},
      skills: userData[0].candidate.skills || {},
      experience: userData[0].candidate.experience || {},
      currentCompany: userData[0].candidate.currentCompany || {},
      currentRole: userData[0].candidate.currentRole || {},
      interestedRole: userData[0].candidate.interestedRole || {},
      knownTechnologies: userData[0].candidate.knownTechnologies || {},
      experienceDescription: userData[0].candidate.experienceDescription || {},
      previousEmployers: previousEmployersList || {},
      resumeName: userData[0].candidate.resumeName || {},
    }


    var k = 0;
    for (var i in emptyData) {
      if (Object.keys(emptyData[i]).length !== 0) {
        k++;
      }
    }

    if (k > 0) {
      setCheck(true)
    }
    setLiked(true);
  }


  useEffect(() => {
    if (userData != 0) {
      checkData();
    }

  }, [userData]);


  const onSubmit = (data) => {
    Mixpanel("Personal Submit / Save ", mixpanelData)

    const formData = new FormData();

    if (selectedFile != "") {
      formData.append('resume', selectedFile);
      formData.append('resumeName', selectedFile.name);
    }
    if (addSkill.length <= 1) {
      setErrorMessage('Please add Skills')
    }
    if (previousEmployersList.length == 0) {
      setErrorMessage("Please add Companie or Clients you worked with")
    }


    if (fileSizeValidate(selectedFile) && selectedFile !== "") {
      if (addSkill.length > 1 && previousEmployersList.length !== 0) {
        setErrorMessage("")
        trackPromise(
          axios
            .patch(
              ApiConstants.PROFILE,
              {
                phone: data.phone,
                currentCity: data.currentCity,
                country: data.country,
                relocation: data.relocation,
                typeOfJob: data.typeOfJob,
                needVisaSponsorship: data.needVisaSponsorship,
                expectedRateC2CorC2H: data.expectedRateC2CorC2H,
                timeToJoin: data.timeToJoin,
                linkedInUrl: data.linkedInUrl,
                overallExperience: data.overallExperience,
                interestedRole: interestedRole,
                currentRole: data.currentRole,
                currentCompany: data.currentCompany,
                previousEmployers: previousEmployersList,
                knownTechnologies: data.knownTechnologies,
                experienceSummary:description,
                skills: addSkill.slice(1, addSkill.length),

              },
              {
                headers: {
                  Accept: "application/json",
                  "Content-type": "application/json",
                  token: token,
                  _id: userId,
                  "Access-Control-Allow-Origin": true,
                  "Access-Control-Allow-Methods": "GET, POST, PATCH",
                },
              }
            ).then((response) => {

              axios.post(
                ApiConstants.CANDIDATE_RESUME_UPLOAD,
                formData,
                {
                  headers: {
                    token: token,
                    _id: userId,
                    "Access-Control-Allow-Origin": true,
                    "Access-Control-Allow-Methods": "GET, POST, PATCH",
                  },
                }).then((response) => {

                  setResumeData(response.data.resumeLink)
                  getData()

                }).catch((error) => {
                  if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 502 && error.response.status <= 599)) {
                    Interceptor(error.response.status)
                  }
                })

              setSuccessMessage("Your Profile is created")
            }).catch((error) => {
              if ((error.response.status >= 404 && error.response.status <= 499) || (error.response.status >= 500 && error.response.status <= 599)) {
                Interceptor(error.response.data.error)
              }
            })
        )
      }
    } else {
      Swal.fire({
        title: "File size should be less than 1MB",
        icon: "error",
        width: 400,
        height: 100,
      })
    }
  }

  // file upload

  const resumeUpload = (e) => {

    const file = e.target.files[0]

    if (fileSizeValidate(file.size)) {

      setSelectedFile(file);
    } else {
      Swal.fire({
        title: "File size should be less than 1MB",
        icon: "error",
        width: 400,
        height: 100,
      })

    }


  }



  const typeOfJobValueFunction = (e) => {
    if (e.target.value == 'C2H' || e.target.value == 'C2C') {
      setExpectedRate(false)
    } else {
      setExpectedRate(true)
    }
  }

  const addPreviousEmployerButton = () => {
    if (addPreviousEmployer.length > 0) {
      setPreviousEmployersList([...previousEmployersList, addPreviousEmployer])
    }
  }

  const deletePreviousEmployer = (index) => {
    setPreviousEmployersList([
      ...previousEmployersList.slice(0, index),
      ...previousEmployersList.slice(index + 1)
    ]);
  }


  const [skillData, setSkillData] = useState([])
  const [successMessageAddSkill, setSuccessMessageAddSkill] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [addSkill, SetAddSkill] = useState([{}]);
  const [interestedRole, setInterestedRole] = useState();
  const [selectedOption, setSelectedOption] = useState(null);


  const skillSelection = useSelector(
    (state) => state.skills
  );


  const handleRemoveItem = (i) => {
    SetAddSkill(addSkill.filter((item, idx) => item.skillId !== i));
  };



  const handleChangeExp = (event, idx) => {

    const label = 'experience'
    const newValue = event.target.value

    SetAddSkill([
      ...addSkill.slice(0, idx + 1),
      {
        ...addSkill[idx + 1],
        [label]: newValue,
      },
      ...addSkill.slice(idx + 2),
    ])
  }

  const handleRating = (rate, idx) => {

    const label = 'rating'
    const newValue = rate

    SetAddSkill([
      ...addSkill.slice(0, idx + 1),
      {
        // here update data value
        ...addSkill[idx + 1],
        [label]: newValue,
      },
      ...addSkill.slice(idx + 2),
    ]);

  }

  const mixpanelButton = (purpose, buttonName) => {
    Mixpanel(purpose, buttonName, candidateEmailId)
  }

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const options = skillSelection.skillList.data.map(item => ({ value: item._id, label: item.skill }))
      const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(filteredOptions);
    }, 1000);
  };

  const jobRoleOptions = (inputValue, callback) => {
    setTimeout(() => {
      const options = jobRoleSelection.jobRoleList.data.map(item => ({ value: item._id, label: item.role }))
      const filteredOptions = options.filter(option =>
        typeof option.label === "string" && option.label.toLowerCase().includes(inputValue.toLowerCase())
      );
      callback(filteredOptions);
    }, 1000);
  };

  const handleChange = (data) => {
    setSelectedOption(selectedOption);
    let newElement

    skillSelection.skillList.data.map(item => {
      if (item._id == data.value) {
        newElement = item.skill
      }
    })

    SetAddSkill(addSkill => [...addSkill, { skillId: data.value, skill: newElement, rating: 0, experience: 0 }])
    setErrorMsg("")
    setTimeout(() => {
      setSelectedOption(null);
    }, 1000);
  }


  const handleChangeRole = (data) => {
    setInterestedRole(data.value)
  }



  const saveSkill = () => {

    if (addSkill.length > 1) {

      let skillArray = addSkill
      let repitationFlag = false
      skillArray = skillArray.concat(skillData)

      if (skillArray.length > 1) {
        for (let i = 1; i < skillArray.length; i++) {
          for (let j = i + 1; j < skillArray.length; j++) {
            if (skillArray[i].skill == skillArray[j].skill) {
              repitationFlag = true
              setErrorMsg(skillArray[i].skill + ' Already Exists')
            }
          }
        }
      }

      if (checkSkillLength(skillArray) === false) {
        setErrorMsg("Please add more than 3 skills. More the better for your profile.")
      }

      else if (checkRequired(skillArray)) {
        setErrorMsg("Please rate the skills")
      }
      else if (checkRequiredExp(skillArray)) {
        setErrorMsg("Please enter experience")
      }

      if (checkSkillLength(skillArray) && checkRequired(skillArray) === false && checkRequiredExp(skillArray) === false && !repitationFlag) {
        setShow(true)
        setTimeout(() => {
          $("[data-dismiss=modal]").trigger({ type: "click" })
        }, 1000)
      }

    } else {
      setErrorMsg("Please add skills")
    }

  }

  useEffect(() => {

    dispatch(GetAllSkills())
    dispatch(GetAllJobList())


    if (userData != 0) {
      setSkillData(userData[0].candidate.skills)

    }

  }, [successMessageAddSkill, userData])




  const deleteSkill = (skill) => {
    let skillArray = addSkill.filter(function (obj, idx) {
      if (obj.skill === skill) {
        addSkill.splice(idx, 1)
      }
      idx = idx + 1;
    });
    skillArray = addSkill
  }


  return (
    liked === false ? <Loading /> : <>
      <NavBarNew />
      {promiseInProgress === true ? (
        <Loading />
      ) : null}

      {check === false?
        <div className="container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <p className="newUser-form-text">Details to identify right opportunities</p>
            <div className="row">
              <div className="col-lg-4 col-md-4 col-sm-6">
                <input
                  type="tel"
                  className="form-control newuser-form-control"
                  name="phone"
                  placeholder="Please Enter Mobile number"
                  {...register("phone", {
                    pattern: {
                      value: /^(1[ \-\+]{0,3}|\+1[ -\+]{0,3}|\+1|\+)?((\(\+?1-[2-9][0-9]{1,2}\))|(\(\+?[2-8][0-9][0-9]\))|(\(\+?[1-9][0-9]\))|(\(\+?[17]\))|(\([2-9][2-9]\))|([ \-\.]{0,3}[0-9]{2,4}))?([ \-\.][0-9])?([ \-\.]{0,3}[0-9]{2,4}){2,3}$/,
                      message: "Please enter valid phone number (Remove whitespaces)",
                    },
                  })}
                />
                {errors.phone && (
                  <span role="alert" style={{ color: "red" }}>
                    {errors.phone.message}
                  </span>
                )}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6 ">
                <input
                  type="text"
                  required
                  name="currentCity"
                  className="form-control newuser-form-control"
                  placeholder="Enter Your current location or City*"
                  {...register("currentCity", {
                    required: "Current City is required",
                  })}
                />
                {errors.currentCity && (
                  <span role="alert" style={{ color: "red" }}>
                    {errors.currentCity.message}
                  </span>
                )}
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <input
                  type="text"
                  className="form-control newuser-form-control"
                  id="inputState"
                  placeholder="Country*"
                  name="country"
                  {...register("country")}
                  required
                />
              </div>
            </div>

            <div className="row mt-lg-4 mt-md-4">
              <div className="col-lg-4 col-md-4 col-sm-6">
                <select
                  className="form-control newuser-form-control"
                  name="relocation"
                  {...register("relocation", { required: 'Relocation is required' })}
                  required
                >
                  <option value="" selected disabled>Open to relocate*</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <select
                  className="form-control newuser-form-control"
                  name="typeOfJob"
                  {...register("typeOfJob")}
                  required
                  onChange={typeOfJobValueFunction}
                >
                  <option value="" selected disabled>Type of Job you want*</option>
                  <option value="Fulltime"> Fulltime</option>
                  <option value="C2C"> C2C </option>
                  <option value="C2H"> C2H </option>
                  <option value="Parttime"> Parttime </option>
                </select>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <select
                  className="form-control newuser-form-control"
                  name="needVisaSponsorship"
                  {...register("needVisaSponsorship")}
                  required
                >
                  <option value="" selected disabled>Do you need Visa Sponsorship?*</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <div className="row mt-lg-4 mt-md-4">

              <div className="col-lg-4 col-md-4 col-sm-6">
                <input
                  type="number"
                  className="form-control newuser-form-control"
                  placeholder="Expected Rate for C2C/C2H (USD/per hour)*"
                  name="expectedRateC2CorC2H"
                  {...register("expectedRateC2CorC2H", {
                    pattern: {
                      value: /^[0-9]*$/,
                      message: ""
                    },
                  })}
                  required={!expectedRate}
                  disabled={expectedRate}
                  min="0"
                />

                {errors.expectedRateC2CorC2H && (
                  <span role="alert" style={{ color: "red" }}>
                    {errors.expectedRateC2CorC2H.message}
                  </span>
                )}

              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <select
                  className="form-control newuser-form-control"
                  name="timeToJoin"
                  {...register("timeToJoin")}
                  required
                >
                  <option value="" selected disabled>When can you join(weeks)*</option>
                  <option value={1}>1 </option>
                  <option value={2}>2 </option>
                  <option value={3}>3 </option>
                  <option value={4}>4 </option>
                </select>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <input
                  type="url"
                  className="form-control newuser-form-control"
                  required
                  placeholder="Your LinkedIn profile link*"
                  name="linkedInUrl"
                  {...register("linkedInUrl", {
                    required: "LinkedIn url is required",
                    pattern: {
                      value: /^(https?:\/\/)?((www|\w\w)\.)?linkedin.com\/((in\/[a-zA-Z0-9-]+)|(company\/[a-zA-Z0-9-]+)|(school\/[a-zA-Z0-9-]+))\/?$/,
                      message: "Enter valid LinkedIn url",
                    },
                  })}
                />
                {errors.linkedInUrl && (
                  <span role="alert" style={{ color: "red" }}>
                    {errors.linkedInUrl.message}
                  </span>
                )}
              </div>
            </div>

            <div className="row mt-lg-4 mt-md-4">
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="input-group ">
                  <input
                    type="number"
                    min="0"
                    max="50"
                    className="form-control newuser-form-control"
                    name="experience"
                    placeholder="Overall experience(Years)*"
                    {...register("overallExperience", { valueAsNumber: true }
                    )}
                    required
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">

                {/* <select className="form-control newuser-form-control" name='role-adding'
                    defaultValue='Select Role'
                    onChange={(e) => handleChangeRole(e.target.value)}
                  >
                    <option value="" disabled selected>Type of role you are looking for</option>
                    {jobRoleSelection.jobRoleList.data.length !== 0 && jobRoleSelection.jobRoleList.data.map((item, key) => {
                      return (
                        <>
                          <option key={key} value={item._id}>{item.role}</option>
                        </>
                      );

                    })}
                  </select> */}
                <AsyncSelect
                  isSearchable={true}
                  cacheOptions={true}
                  loadOptions={jobRoleOptions}
                  placeholder="Search a Job Role*"
                  onChange={handleChangeRole}
                  required
                  formatOptionLabel={(option) => (
                    <>
                      {option.value === '' && <div>Please start typing to search for job role</div>}
                      <div>{option.label}</div>
                    </>
                  )}
                  noOptionsMessage={({ inputValue }) =>
                    inputValue ? 'No results found' : 'Please start typing to search for job role'
                  }
                />

              </div>
              <div className="col-lg-4 col-md-4 col-sm-6">
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control newuser-form-control"
                    placeholder="Current Role*"
                    name="currentRole"
                    {...register("currentRole")}
                    required
                  />
                </div>
              </div>
            </div>

            <div className="row mt-lg-4 mt-md-4">
              {/* <div className="col-md-6 col-sm-6">
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control newuser-form-control"
                    placeholder="Current Company / Client*"
                    name="currentCompany"
                    {...register("currentCompany")}
                    required
                  />
                </div>
              </div> */}

              <div className="col-md-6 col-sm-6">
                <div className="input-group ">
                  <input
                    type="text"
                    className="form-control newuser-form-control mb-2 "
                    name="previousEmployers"
                    placeholder="Enter Companies or Clients you have worked with*"
                    {...register("previousEmployers")}
                    onChange={(e) => { setAddPreviousEmployer(e.target.value) }}
                  />
                  <GrAddCircle onClick={addPreviousEmployerButton} style={{ cursor: 'pointer', marginTop: '6px' }} size={20} />
                </div>

              </div>
            </div>
            {previousEmployersList.length > 0 && <div>
              {
                previousEmployersList.length > 0 &&
                <div className="previous-employer-list">

                  {
                    previousEmployersList.map((d, index) => {
                      return (
                        <>
                          <div className="previous-employer-box">
                            <span>{d}</span>
                            <RxCrossCircled onClick={() => deletePreviousEmployer(index)} style={{ cursor: 'pointer', marginTop: '2px' }} />
                          </div>
                        </>
                      )
                    })
                  }

                </div>
              }

            </div>}



            <div className="row mt-4 mt-lg-4 mt-md-4 descriptionBox">

              <label className="form-label">
                Description*
              </label>

              <ReactQuill
                className="quill"
                value={description} 
                onChange={setDescription}
                modules={modules}
                formats={formats}
                placeholder="Enter your item description here (upto 300 words)"
              />

            </div>

            <div className="row mt-4 mt-lg-4 mt-md-4 size-reducer">
              <div className="card mb-3 candidate-skill-section">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <span
                      style={{
                        fontWeight: "500",
                        fontSize: "20px",
                        color: "#444444",
                      }}
                    >
                      <b>Technical / Soft / Personal Skills</b>
                    </span>

                    {/* ADD SKILL PopUP */}
                    <button
                      type="button"
                      className="btn edtBtn"
                      data-toggle="modal"
                      data-target="#skilladd"
                    >
                      <BsPlusCircle />
                    </button>

                    <div
                      className="modal fade"
                      id="skilladd"
                      tabindex="-1"
                      role="dialog"
                      aria-labelledby="exampleModalCenterTitle"
                      aria-hidden="true"
                    >
                      <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content modalContent">
                          <div className="modal-header">
                            <p className="modal-title" id="exampleModalLongTitle"
                              style={{
                                fontWeight: "500",
                                fontSize: "1.5rem",
                                color: "#444444",
                              }}
                            >
                              Add Skills
                            </p>
                            <button
                              type="button"
                              className="btn"
                              data-dismiss="modal"
                              aria-label="Close"
                            >
                              <AiOutlineCloseCircle />
                            </button>
                          </div>
                          <div className="modal-body ">
                            <div className="container-fluid">

                              {promiseInProgress === true ? <Loading /> : null}

                              <div className="filter-search-box">
                                <div className="form-group has-search-for-filter">
                                  {/* <span className="fa fa-search form-control-feedback-for-filter"></span> */}

                                  <div className="mb-3">

                                    {/* <input type="text" list="data" 
                                className="form-control"
                                placeholder="Search" 
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                {...register("searchSkill")}
                                required /> */}
                                    <AsyncSelect
                                      isSearchable={true}
                                      cacheOptions={true}
                                      value={selectedOption}
                                      loadOptions={loadOptions}
                                      placeholder="Search a skill"
                                      onChange={handleChange}
                                      formatOptionLabel={(option) => (
                                        <>
                                          {option.value === '' && <div>Please start typing to search for a skill</div>}
                                          <div>{option.label}</div>
                                        </>
                                      )}
                                      noOptionsMessage={({ inputValue }) =>
                                        inputValue ? 'No results found' : 'Please start typing to search for a skill'
                                      }
                                    />
                                    {/* <select className="form-select" name='skill-adding'
                                      defaultValue={'Select Skill'}
                                      {...register('candidateSkill')}
                                      onChange={(e) => handleChange(e.target.value)}
                                    >
                                      <option value="" selected disabled>Please select skill</option>

                                      {skillSelection.skillList.data.length != 1 && skillSelection.skillList.data.slice(1, skillSelection.skillList.data.length).map((item, key) => {

                                        return (
                                          <>
                                            <option key={key} value={item._id}>{item.skill}</option>
                                          </>
                                        );

                                      })}
                                    </select> */}
                                    {/* <div className="input-group-append mx-1">
                              <button className="btn addSkillBtn" type="submit" >Add</button>
                            </div> */}
                                  </div>

                                </div>
                              </div>

                              <div className='mt-4'>
                                {
                                  addSkill.length == 1
                                    ? <p className='text-center' ></p>
                                    : addSkill.slice(1, addSkill.length).map((e, i) => {
                                      return (
                                        <div className='d-flex justify-content-around m-3'>

                                          <div className="col-md-2">
                                            <span className='same-formating'>{e.skill}</span>
                                          </div>

                                          <div>
                                            <input className="rounded border-light"
                                              placeholder="Experience (in years)"
                                              onChange={(e) => { handleChangeExp(e, i) }}
                                              name="skillExp"
                                              type="number"
                                              required
                                              min="0"
                                            />
                                          </div>
                                          {/* Star Rating */}
                                          <div>
                                            <div className='col filter-star' >
                                              <Rating id={i} initialValue={0} onClick={(rate) => handleRating(rate, i)} fillColor='#4B2DFF'
                                                size='23px' />

                                            </div>
                                          </div>

                                          <div>
                                            <button className="deleteSkillBtn" type="button " onClick={() => handleRemoveItem(e.skillId)}>
                                              <MdDelete size={25} />
                                            </button>
                                          </div>
                                        </div>
                                      )
                                    })
                                }
                              </div>

                              <div className="d-flex justify-content-center mt-3 mb-3">
                                <button type="button" style={{ background: 'var(--list-item-color)' }} onClick={() => { saveSkill(); mixpanelButton('Candidate Added Skills in Personal Page', 'Save button') }} className="buttonSend me-md-2 ">
                                  Save
                                </button>
                              </div>
                              <p className="text-center fs-6" style={{ color: "red" }}>
                                {errorMsg}
                              </p>
                              <p className="text-center fs-6" style={{ color: "green" }}>
                                {successMessageAddSkill}
                              </p>

                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="edit-button">
                    <button
                      type="button"
                      className="btn"
                      data-toggle="modal"
                      data-target="#skill"
                    >
                      <BsPencil />
                    </button>


                  </div>
                  <div
                    className="modal fade"
                    id="skill"
                    tabindex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalCenterTitle"
                    aria-hidden="true"
                  >
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                      <div className="modal-content modalContent ">
                        <div className="modal-header">
                          <p className="modal-title"
                            style={{
                              fontWeight: "500",
                              fontSize: "1.5rem",
                              color: "#444444",
                            }} >
                            Edit Skill
                          </p>

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
                          <div className="container-fluid">


                            {show && addSkill.length > 1 ?
                              addSkill.slice(1, addSkill.length).map((x, key) => {
                                return (
                                  <div>
                                    <div className="d-flex justify-content-between mt-3">
                                      <div className="col-md-3 col-sm-12">
                                        <span style={{ fontWeight: "400", fontSize: "1rem" }}>
                                          <b>{x.skill}</b>
                                        </span>
                                      </div>

                                      <div className="">
                                        <div>
                                          <p>Self Rating</p>
                                        </div>
                                        <div>
                                          <p>Experience </p>
                                        </div>
                                      </div>

                                      <div className=" ">
                                        <div>
                                          <p>
                                            <StarRating rating={(x.rating)} />
                                          </p>
                                        </div>
                                        <div>
                                          <p>{x.experience}</p>
                                        </div>
                                      </div>
                                      <div className=" ">
                                        <button type="button" className="deleteSkillBtn" onClick={() => handleRemoveItem(x.skillId)}

                                        >
                                          <MdDelete size={25} />
                                        </button>
                                      </div>
                                    </div>
                                    <hr className="mt-0"></hr>
                                  </div>

                                )
                              }) : " "}

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="updDel">

                    {show && addSkill.length > 1 ?
                      addSkill.slice(1, addSkill.length).map((x) => {
                        return (
                          <UpdDelSkillUser key={x._id} skillId={x._id} rating={x.rating} experience={x.experience} skill={x.skill} />
                        )
                      }) : " "}

                  </div>
                </div>
              </div>
            </div>


            <div className="row mt-lg-4 mt-md-4">
              <label className="form-label">Resume Upload (File format should be only .pdf, .doc, .docx and  size should be less than 1MB)*</label>
              <div className="ml-2 mr-2" >
                <input
                  className="form-control newuser-form-control"
                  type="file"
                  name="file_upload"
                  accept="application/pdf, .doc, .docx"
                  onChange={resumeUpload}
                  required />

              </div>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <button className="candidate-buttonSend"
                type="submit">
                Submit
              </button>
            </div>

            <div className="d-flex justify-content-center mt-4">
              <p style={{ color: "green" }}>
                {suceccessMessage}
              </p>
              <p style={{ color: "red" }}>
                {errorMessage}
              </p>
            </div>

          </form>

        </div > : <UserEditProfile />
      }

    </>
  );
};

export default Profile;

