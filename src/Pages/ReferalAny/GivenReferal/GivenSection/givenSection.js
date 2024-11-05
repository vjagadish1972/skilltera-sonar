import React, { useState } from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import StarRating from "../../../../Component/StarRating/starRating"
import "./givenSection.css"

const GivenSection = (props) => {
  const [formValue] = useState({
    candidateName: props.candidateName,
    candidateEmail: props.candidateEmail,
    candidateLinkedInUrl: props.candidateLinkedInUrl,
    connectionType: props.connectionType,
    description: props.description,
    skills: props.skills,
  });



  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];


  function dateConverterTypeSec(str) {
    var date = new Date(str)
    var mnth = ("0" + (date.getMonth() + 1)).slice(-2)
    var day = ("0" + date.getDate()).slice(-2);
    var hours = ("0" + date.getHours()).slice(-2);
    var minutes = ("0" + date.getMinutes()).slice(-2);
    var seconds = ("0" + date.getSeconds()).slice(-2);
    var year = date.getFullYear();
    return `${monthNames[mnth - 1] + " " + day + " " + year}`

  }


  return (
    <>
      <div className="d-flex justify-content-between mt-3">
        <div>
          <p style={{ fontSize: "1.1rem", fontWeight: "400" }}  > <b>{formValue.candidateName}  </b> </p>

          <p style={{ fontSize: "1rem", fontWeight: "400" }}>  {formValue.connectionType} </p>

          <p style={{ fontSize: "0.9rem", fontWeight: "400" }} >
            Date: &nbsp;&nbsp;  {dateConverterTypeSec(props.referDate)}

          </p>


        </div>

        <div>
          <button
            type="button"
            className="btn btn-outline-secondary"
            data-toggle="modal"
            data-target={"#about" + `${formValue.candidateId}`}
          >
            view more
          </button>
        </div>

      </div>

      <div
        className="modal fade"
        id={"about" + `${formValue.candidateId}`}
        tabindex="-1"
        role="dialog"
        aria-labelledby="exampleModalCenterTitle"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
          <div className="modal-content modalContent">
            <div className="modal-header">

              <h5 className="modal-title mx-5" id="exampleModalLongTitle">
                Referral Details
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
            <div className="modal-body mt-4 ">

              <div className="row   referDetail" >
                <div className="col-md-6" > <p className="text-start" style={{ fontSize: "1.1rem", color: "#6F6F6F" }}>Name </p> </div>
                <div className="col-md-6" > <p className="text-start" style={{ fontSize: "1.1rem" }}>
                  {formValue.candidateName}
                </p> </div>
              </div>

              <div className="row  referDetail" >
                <div className="col-md-6" > <p className="text-start" style={{ fontSize: "1.1rem", color: "#6F6F6F" }}>LinkedIn URL </p> </div>
                <div className="col-md-6" > <a href={formValue.candidateLinkedInUrl} className="text-start" style={{ fontSize: "1.1rem", color: "rgb(128, 27, 211)" }} target="_blank" >
                  {formValue.candidateLinkedInUrl}
                </a> </div>
              </div>

              <div className="row  referDetail" >
                <div className="col-md-6" > <p className="text-start" style={{ fontSize: "1.1rem", color: "#6F6F6F" }}>Email address </p> </div>
                <div className="col-md-6" > <p className="text-start" style={{ fontSize: "1.1rem" }}>
                  {formValue.candidateEmail}
                </p> </div>
              </div>
              <div className="row  referDetail" >
                <div className="col-md-6" > <p className="text-start" style={{ fontSize: "1.1rem", color: "#6F6F6F" }}>How do you know the person?  </p> </div>
                <div className="col-md-6" > <p className="text-start" style={{ fontSize: "1.1rem" }}>
                  {formValue.connectionType}
                </p> </div>
              </div>

              <p className="mt-3 mb-3 mx-md-5"> <b> Skill Rating </b> </p>

              {props.skills.length > 0 ?

                props.skills.map((x) => {
                  return (

                    <div key={x._id} className="mx-5 " >
                      <div className="d-flex justify-content-between mt-5 ">
                        <div className=""> <span> <b>{x.skillId.skill}</b> </span> </div>
                        <div className="">
                          <StarRating rating={x.rating} />
                        </div>
                      </div>
                      <hr></hr>
                    </div>

                  )
                }) : " "}

              <div className="" >
                <p className="description"> <b>About the candidate  </b> </p>
                <p className="description"> {formValue.description}  </p>
              </div>

            </div>
          </div>
        </div>
      </div>
      <hr></hr>
    </>
  )
}

export default GivenSection
