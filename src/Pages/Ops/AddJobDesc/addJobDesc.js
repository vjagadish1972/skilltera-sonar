import React, { useEffect, useState, useContext ,useRef} from 'react'
import './addJobDesc.css'
import { useForm } from "react-hook-form";
import axios from 'axios';
import Swal from 'sweetalert2';
import { Rating } from 'react-simple-star-rating';
import ApiConstants from '../../../Services/apiconstants';
import { MdDelete } from "react-icons/md";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { AiOutlineCloseCircle } from "react-icons/ai";
import AsyncSelect from 'react-select/async';
import { opsContext } from '../../../Context/opsContextState'



const AddJobDesc = () => {

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    mode: 'onChange',
  });

  const { allJobRole, updateJobRole, companiesList, skillList, updateSkillListData } = useContext(opsContext)

  

  const [addSkill, SetAddSkill] = useState(new Map());

  const [selectedOption, setSelectedOption] = useState(null);

  const [id, setId] = useState("");
  const [token, setToken] = useState("");

  const [companyIds, setCompanyIds] = useState()
  const [jobRoleId, setJobRoleId] = useState()
  const [description, setDescription] = useState('');
  const [addJobRole, SetAddJobRole] = useState('')
  const [newSkill , setNewSkill] = useState('')

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered' }, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  };

  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
  ];




  const addNewSkill = (data) => {

    setSelectedOption(selectedOption);

    let newElement

    skillList.map(item => {
      if (item._id == data.value) {
        newElement = item.skill
      }
    })

    SetAddSkill((prev) => {
      const updatedAddSkill = new Map(prev);
      updatedAddSkill.set(data.value, { skillId: data.value, skill: newElement, rating: 0, requiredExperience: 0 });
      return updatedAddSkill;
    })

    setTimeout(() => {
      setSelectedOption(null);
    }, 1000);

  }

  const handleRemoveItem = (objectId) => {
    const updatedMap = new Map(addSkill);
    updatedMap.delete(objectId);
    SetAddSkill(updatedMap);
  }



  const handleChangeExp = (id, val) => {
    const objToUpdate = addSkill.get(id);
    objToUpdate.requiredExperience = val;
    addSkill.set('key2', objToUpdate);
  }

  // const validateJobRole = (value) => {
  //   if (!allJobRole.some((item) => item.role === value)) {
  //     return 'Please select a valid job role.';
  //   }
  //   return true;
  // };

  // const validateCompanyName = (value) => {
  //   if (!companiesList.some((item) => item.companyName === value)) {
  //     return 'Please select a valid company name.';
  //   }
  //   return true;
  // }

  const handleRating = (idx, rate) => {
    const objToUpdate = addSkill.get(idx);
    objToUpdate.rating = rate;
    addSkill.set('key2', objToUpdate);
  }

  const loadOptions = (inputValue, callback) => {
    setTimeout(() => {
      const options = skillList.map(item => ({ value: item._id, label: item.skill }))
      const filteredOptions = options.filter(option =>
        option.label.toLowerCase().includes(inputValue.toLowerCase())
      )
      callback(filteredOptions);
    }, 300);
  }


  const companyNameInputRef = useRef();

  const handleOptionSelectOfCompanyName = (event ) => {
    const selectedCompanyName = event.target.value;
    const dataList = companyNameInputRef.current.list;

    if (dataList) {
      const selectedOption = Array.from(dataList.options).find((option) => option.value === selectedCompanyName);

      if (selectedOption) {
        const selectedCompanyId = selectedOption.getAttribute('data-company-id');
        setCompanyIds(selectedCompanyId);
      }
    }
  };




  const jobRoleInputRef = useRef();

  const handleOptionSelectOfJobRole = (event ) => {
    const selectedJobRole = event.target.value;
    const dataList = jobRoleInputRef.current.list;

    if (dataList) {
      const selectedOption = Array.from(dataList.options).find((option) => option.value === selectedJobRole);

      if (selectedOption) {
        const selectedRoleId = selectedOption.getAttribute('data-role-id');
        
        setJobRoleId(selectedRoleId);
      }
    }
  };

  const onSubmitJobDesc = async (data) => {

    let skillData = []
    for (const [v] of addSkill.entries()) {
      skillData.push(v)
    }
    SetAddSkill(new Map())
   skillData.pop();
  
   await axios.post(ApiConstants.ADD_JOBS, {
      companyId: companyIds,
      jobId: data.jobId,
      jobTitle: data.jobTitle,
      jobRole: jobRoleId,
      workExperience: data.experience,
      jobType: data.jobType,
      travelRequired: data.travelRequired,
      country: data.country,
      state: data.state,
      city: data.city,
      postedOn: data.postedOn,
      lastDate: data.lastDate,
      jobDescription: description,
      skillRequired: skillData
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
          title: "added successful ",
          icon: "success",
          allowOutsideClick: true,
          allowEscapeKey: true,
          allowEnterKey: true,
          confirmButtonText: "Ok",
        });

        reset()
        SetAddSkill([])
      }).catch((error) => {
        Swal.fire({
          title: "Backend not connected",
          icon: "info",
          width: 400,
          height: 100,
        });

      })

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
    

        updateSkillListData({ _id:res.data.skill._id, skill:res.data.skill.skill , active: true});

    })
    .catch((error) => {
        Swal.fire({
            title: error.message,
            icon: "error",
            width: 400,
            height: 100,  
        });
    });
  }else{
    Swal.fire({
      title: "skill already exist",
      icon: "error",
      width: 400,
      height: 100,
  })

  }

  }


  const onSubmitJobRole = (event) => {

    event.preventDefault();

    const roleFound = allJobRole.some((obj) => obj.role === addJobRole);


    if (roleFound === false) {

      axios.post(ApiConstants.ADD_JOB_ROLES, 
        {
          newRole: addJobRole
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
            title: "added successful ",
            icon: "success",
            allowOutsideClick: true,
            allowEscapeKey: true,
            allowEnterKey: true,
            confirmButtonText: "Ok",
          });

          updateJobRole(response.data.role)

        }).catch((error) => {
          Swal.fire({
            title: error,
            icon: "info",
            width: 400,
            height: 100,
          });
        })
    }
    else {
      Swal.fire({
        title: "Job already exist in data base",
        icon: "info",
        width: 400,
        height: 100,
      });
    }
  }



  useEffect(() => {

    setId(JSON.parse(sessionStorage.getItem("ops_data")).admin._id);
    setToken(JSON.parse(sessionStorage.getItem("ops_token")));

  }, [token])

  const skillItem = []

  for (const [k, v] of addSkill.entries()) {

    skillItem.push(

      <div className='row d-flex justify-content-between m-2' key={k}>
        <div className="col-md-4" >
          <span className='same-formating'>{v.skill} </span>
        </div>
        <div className="col-md-4" >
          <input className="rounded border-light"
            placeholder="Experience (in year)"
            onChange={(e) => { handleChangeExp(k, e.target.value) }}
            name="skillExp"
            type="number"
            required
            min="0"
          />
        </div>

        <div className="col-md-3" >
          <Rating id={k} initialValue={0}
            onClick={(rate) => handleRating(k, rate)} fillColor='#4B2DFF'
            size='23px' />
        </div>

        <div className="col-md-1" >
          <MdDelete size={25}
            onClick={() => handleRemoveItem(k)} style={{ 'cursor': 'pointer' }}
          />
        </div>
      </div>

    )
  }

  return (
    <>

      <div className="container "  >

        <div className="opsContainer">
          <form className="border" onSubmit={handleSubmit(onSubmitJobDesc)} autoComplete='off'>

            <h1 className="text-center m-3"> Job data</h1>
            <div className="row m-4">
              <div className="form-group col-md-6">
                <label htmlFor="companyName">CompanyName</label>
                <input type="text"
                   id='companyName'
                   ref={companyNameInputRef}
                  className="form-control"
                  list="job-options"
                  onInput={handleOptionSelectOfCompanyName}
                  
                />
                <datalist id="job-options">
                  {companiesList.length > 0 ? companiesList.map((option, index) => (
                    <option key={index} value={option.companyName} id={option._id} data-company-id={option._id}  />
                  )) : ""}
                </datalist>
                {errors.companyIds && <div role="alert" style={{ color: "red" }} >{errors.companyIds.message}</div>}
              </div>
            
              <div className="form-group col-md-6">
  <label htmlFor="inputCity">Job id</label>
  <input
    type="text"
    className="form-control"
    id="inputCity" 
    {...register("jobId")}
  />
</div>


            </div>

            <div className="row m-4">
              <div className="form-group col-md-4">
                <label htmlFor="inputCity">Job title</label>
                <input type="text" className="form-control" id="inputCity" 
                  {...register("jobTitle")}
                />
              </div>

              <div className="form-group col-md-5" >
                <label htmlFor="inputCity">Job Role</label>
                <input type="text" className="form-control" id="inputCity"

                  placeholder="Type of Role you are looking for*"
                  ref={jobRoleInputRef}
                  list="jobRole-option"
                  onInput={handleOptionSelectOfJobRole}
                />

                <datalist id="jobRole-option" >
                  {allJobRole.map((d, i) => {
                    return (
                      <>
                        <option key={i} value={d.role} id={d._id} data-role-id={d._id} />
                      </>
                    );
                  })}
                </datalist>
                {errors.jobRoleId && <div role="alert" style={{ color: "red" }}>{errors.jobRoleId.message}</div>}
              </div>

              <div className="form-group mt-4 col-md-3">
                <button
                  type="button"
                  className="btn buttonSend "
                  style={{ background: "var(--list-item-color)" }}
                  data-toggle="modal"
                  data-target="#addJob"
                >
                  Add Job Role
                </button>
              </div>
            </div>

            <div className="row m-4">
              <div className="form-group col-md-4">
                <label htmlFor="inputCity">Year Of Experience</label>
                <input type="number" min={0} className="form-control" id="inputCity"
                  {...register("experience")}
                />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="inputCity">Job Type</label>
                <select
                  className="form-control"
                  id="inputCity"
                  name="jobType"
                  required
                  {...register("jobType")}
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
                <label htmlFor="inputCity">Travel Required</label>
                <select className="form-control" name="travelRequired" id="inputCity"
                  {...register("travelRequired")}
                >
                  <option value="true"> Yes</option>
                  <option value="false"> No</option>
                </select>
              </div>


            </div>


            <div className="row m-4">
              <div className="form-group col-md-4">
                <label htmlFor="inputCity">Country</label>
                <input type="text" className="form-control" id="inputCity"
                  {...register("country")}
                />
              </div>


              <div className="form-group col-md-4">
                <label htmlFor="inputCity">State</label>
                <input type="text" className="form-control" id="inputCity"
                  {...register("state")}
                />
              </div>

              <div className="form-group col-md-4">
                <label htmlFor="inputCity">City</label>
                <input type="text" className="form-control" id="inputCity"
                  {...register("city")}
                />
              </div>
            </div>

            <div className="row m-4">
              <div className="form-group col-md-6">
                <label htmlFor="inputCity">PostedOn</label>
                <input type="date" className="form-control" id="inputCity"
                  {...register("postedOn")}
                />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="inputCity">End Date</label>
                <input type="date" className="form-control" id="inputCity"
                  {...register("lastDate")}
                />
              </div>
            </div>

            <div className="row m-4">
              <div className="form-group ">
                <label htmlFor="inputCity">Job Description</label>
                {/* <textarea className="form-control" rows="5"

                  {...register("jobDescription")}
                /> */}
                <ReactQuill
                  style={{
                    width: '100%',
                    height: '60%',
                    borderRadius: '4px',
                    padding: '10px'
                  }}
                  value={description}
                  onChange={setDescription}
                  modules={modules}
                  formats={formats}
                  placeholder="Enter your item description here"
                />
              </div>
            </div>

            <div className="row m-4">
              <div className="col-md-9 col-sm-9 mt-3 ">
                <span className >Add Skills* </span>

                <AsyncSelect
                  isSearchable={true}
                  cacheOptions={true}
                  value={selectedOption}
                  loadOptions={loadOptions}
                  placeholder="Search a skill"
                  onChange={addNewSkill}
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

                <div>  {skillItem} </div>

              </div>

              <div className="col-md-2 col-sm-2 mt-5 ">
                <button className="buttonSend"
                  style={{ background: "var(--list-item-color)" }}
                  type="button"
                  data-toggle="modal"
                  data-target="#addNewSkill"
                > Add New Skill  </button>
              </div>

            </div>

            <div className="d-flex justify-content-center">
              <button type="submit" className="buttonSend m-5 "
                style={{ background: "var(--list-item-color)" }}
              > Upload Job  </button>
            </div>
          </form>
        </div>
      </div>


      {/* modal addJob */}

      <div
        className="modal fade"
        id="addJob"
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered" role="document">
          <div className="modal-content modalContent">
            <div className="modal-header">
              <h5 className="modal-title mx-3" id="exampleModalLongTitle">
                Add Job Role
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
              <form onSubmit={onSubmitJobRole}>
                <div className="row m-3 ">
                  <label  htmlFor="addingJobRole" className="labelPos">Add Job Role </label>
                  <input
                    type="text"
                    className="form-control"
                    name="addingJobRole"
                    id="addingJobRole"
                    value={addJobRole}
                    onChange={(event) => SetAddJobRole(event.target.value)}
                  />
                </div>

                <div className="d-flex justify-content-center mt-3 mb-3">
                  <button
                    type="submit"
                    className="buttonSend me-md-2"
                    style={{ background: "var(--list-item-color)" }}

                  >
                    Save
                  </button>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>

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
                  <label htmlFor="newSkill" className="labelPos">Add New Skill </label>
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

export default AddJobDesc