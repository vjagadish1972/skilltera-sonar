import React, { useState, useEffect } from 'react'
import { BsPlusCircle } from "react-icons/bs";
import { trackPromise } from "react-promise-tracker";
import { MdLibraryAdd } from "react-icons/md";
import ApiConstants from '../../../Services/apiconstants';
import axios from 'axios';
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { AiOutlineCloseCircle, AiOutlineDelete } from "react-icons/ai";
import GivenReferal from "./GivenReferal/givenReferal"
// import ReactStars from "react-rating-stars-component";


const ReferCand = () => {

  const candidateData = JSON.parse(sessionStorage.getItem("candidate_data"));
  const token = candidateData.token;
  const userId = candidateData.candidate._id;
  const [finalSkill, SetFinalSkill] = useState([{}])

  const [successMsgRefer, setSuccessMsgRefer] = useState("")
  const [errorMassage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { },
  } = useForm();


  const skillSelection = useSelector(
    (state) => state.skills
  );

  const [rating, setRating] = useState(0)



  const [addSkill, SetAddSkill] = useState([{}]);



  const [newState] = useState([{
    skill: '',
    rating: ''

  }]);

  const [skillQuery] = useState('');
  const [referalStatus] = useState(false)



  const handleRemoveItem = (i) => {

    SetAddSkill(addSkill.filter(item => item.skill !== i));

  };



  const handleRating = (rate) => {

    setRating(rate);

    // skillTest.slice(1, skillTest.length).map((s, i) => {
    //   setNewState(newState => [...newState, { skill: s.skill, rating:rate }])
    // })


  }

  const addNewSkill = (data) => {
    const newElement = data.searchSkill
    SetAddSkill(addSkill => [...addSkill, { skill: newElement, rating: rating }])
  }

  const saveSkill = () => {
    const key = 'skill';
    const key2 = 'rating';

    const arrayUniqueByKey2 = [...new Map(newState.slice(1, newState.length).map(item =>

      [item[key2], item])).values()];

    const skillArray = [...new Map(arrayUniqueByKey2.map(item =>

      [item[key], item])).values()];

    console.log("skillarray", skillArray)

  }


  const ratingChanged = (newRating, skill) => {

    SetFinalSkill(finalSkill => [...finalSkill, { skill: skill, rating: newRating }])

  };


  const onSubmit = (data) => {

    trackPromise(
      axios
        .post(
          ApiConstants.CREATE_REFERRER,
          {
            candidateName: data.candidateName,
            candidateEmail: data.candidateEmail,
            candidateLinkedInUrl: data.candidateLinkedInUrl,
            connectionType: data.connectionType,
            description: data.description,
            skills: finalSkill,
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
        )
        .then((response) => {
          setSuccessMsgRefer("Thanks for referring the candidate. Please follow-up and request the candidate to complete the detailed profile. We will inform you if the candidate is shortlisted or selected by the client organization.")
        }).catch((error) => {
          setErrorMessage(error.response.data.error)
        })
    )
  }

  useEffect(() => {
    const manageOutSideClick = (event) => {
      setErrorMessage("")
      setSuccessMsgRefer("")
    }
    document.addEventListener("click", manageOutSideClick)
    return () => {
      document.removeEventListener("click", manageOutSideClick)
    }
  }, [])




  return (
    <>
      <div className="card mb-3" >
        <div className="card-body">

          <div className="d-flex justify-content-between ">
            <span style={{ fontWeight: "500", fontSize: "1.5rem", color: "#444444" }}> <b> Referal</b></span>

            <button
              type="button"
              className="btn edtBtn"
              data-toggle="modal"
              data-target=".referal"
            >
              <BsPlusCircle />
            </button>
          </div>


          {referalStatus === true ? <div>

            <div className="d-flex justify-content-center  mt-3">
              <button type="button" className="btn edtBtn" data-toggle="modal" data-target=".referal">
                <MdLibraryAdd size={25} color="#6e4dcd" />
              </button>
            </div>
            <div className="d-flex justify-content-center  mt-3">
              <div class="buttonSend me-md-2 " >
                Send Referral’s
              </div>
            </div> </div> : <div className="mt-3">


            <span className="m-5 status" > Given</span>

            <hr></hr>

            <GivenReferal />

          </div>

          }

          <div className="modal fade referal" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">

            <div className="modal-dialog modal-lg">
              <div className="modal-content modalContent">

                <div className="modal-header">
                  <p className="modal-title fs-3 " id="exampleModalLongTitle">  Referal </p>
                  <button type="button" className="btn" data-dismiss="modal" aria-label="Close">
                    <AiOutlineCloseCircle />
                  </button>
                </div>

                <div className="modal-body">

                  <div className="container-fluid">

                    <span className="" >Add Detail </span>

                    <form onSubmit={handleSubmit(onSubmit)}>

                      <div className="row m-3 mb-0 ">
                        <div className="col-md-6 ">
                          <span className="mb-2" > Referral’s Name </span>
                          <input
                            type="text"
                            className="form-control"
                            id=""
                            placeholder=""
                            name="candidateName"
                            {...register("candidateName")}
                          />
                        </div>

                        <div className="col-md-6">
                          <span className="mb-2" > How do you know him ?  </span>
                          <input
                            type="text"
                            className="form-control"
                            id=""
                            placeholder=""
                            name="connectionType"
                            {...register("connectionType")}
                          />
                        </div>
                      </div>

                      <div className="row m-3 mb-0 mx-4 ">
                        <span className="mb-2" > Referral’s email address</span>
                        <input
                          type="text"
                          className="form-control"
                          id=""
                          placeholder="sonal123@gmail.com"
                          name="candidateEmail"
                          {...register("candidateEmail")}
                        />
                      </div>
                      <div className="row m-3 mx-3 ">

                        <span className="mb-2" > LinkedIn Url</span>
                        <input
                          type="url"
                          className="form-control"
                          name="candidateLinkedInUrl"
                          {...register("candidateLinkedInUrl")}
                        />


                      </div>

                      <div className="row m-2 mt-3 ">

                        {/* skill adding  start*/}

                        <span >
                          Add Skills
                        </span>

                        <div className="filter-search-box">
                          <div className="form-group has-search-for-filter">
                            <span className="fa fa-search form-control-feedback-for-filter"></span>

                            <div className="input-group mb-3">

                              <input type="text" list="data" className="form-control"
                                placeholder="Search" aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                {...register("searchSkill")}
                                required />

                              <datalist id="data">
                                {skillSelection.skillList.data.length != 1 && skillSelection.skillList.data.slice(1, skillSelection.skillList.data.length).map((item, key) => {
                                  if (item.skill.toUpperCase().includes(skillQuery.toUpperCase())) {
                                    return (
                                      <>
                                        <option key={key} value={item.skill} />
                                      </>
                                    )
                                  }
                                })}
                              </datalist>

                              <div className="input-group-append m-1">
                                <button className="btn btn-outline-secondary" onClick={handleSubmit(addNewSkill)} >Add</button>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          {
                            addSkill.length == 1
                              ? <p className='text-center' >No Skill is found</p>
                              : addSkill.slice(1, addSkill.length).map((e, i) => {
                                return (
                                  <div className='d-flex justify-content-between m-3 '>
                                    <div >
                                      <span className='same-formating'>{e.skill}</span>
                                    </div>

                                    {/* <div>
                                      <ReactStars
                                        count={5}
                                        onChange={(rating) => ratingChanged(rating, e.skill)}
                                        size={24}
                                        activeColor="#ffd700"
                                        value={e.rating}
                                      />
                                    </div> */}

                                    <div>
                                      <AiOutlineDelete size={25} onClick={() => handleRemoveItem(e.skill)} style={{ 'cursor': 'pointer' }} />
                                    </div>
                                  </div>
                                );
                              })
                          }
                        </div>
                      </div>

                      {/* skill adding  start*/}

                      <div className="row m-3 ">
                        <span className="mb-2" >Description </span>
                        <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"
                          placeholder="Hi,
                           I am requesting you to rate my skill"
                          name="description"
                          {...register("description")}
                        ></textarea>
                        <p style={{ textAlign: "right" }}> 0/500</p>
                      </div>

                      <div className="d-flex justify-content-center mt-3">
                        <button
                          type="submit"
                          className="buttonSend
 me-md-2 "
                          onClick={saveSkill}
                        >
                          Save
                        </button>
                      </div>

                      <p className="text-center fs-6 mt-3" style={{ color: "green" }}>
                        {successMsgRefer}
                      </p>
                      <p className="text-center fs-6 mt-3" style={{ color: "Red" }}>
                        {errorMassage}
                      </p>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default ReferCand
