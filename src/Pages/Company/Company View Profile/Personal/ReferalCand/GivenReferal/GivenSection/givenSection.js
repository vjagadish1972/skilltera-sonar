import React from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import StarRating from "../../../../../Component/StarRating/starRating"

const GivenSection = (props) => {


  return (
    <>

      <div className="d-flex justify-content-between mt-3">
        <span
          style={{
            fontWeight: "500",
            fontSize: "1.5rem",
            color: "#444444",
          }}
        >
          {props.candidateName}
        </span>

        <button
          type="button"
          className="btn btn-outline-secondary"
          data-toggle="modal"
          data-target={"#about" + `${props.candidateId}`}
        >
          view more
        </button>

        <div
          className="modal fade"
          id={"about" + `${props.candidateId}`}
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content modalContent">
              <div className="modal-header">

                <h5 className="modal-title" id="exampleModalLongTitle">
                  Given Referal
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

                <div className="row">
                  <span className="mt-1">{props.candidateName}</span>
                  <span className="mt-1"> {props.candidateLinkedInUrl}</span>
                  <span className="mt-1"> {props.candidateEmail} </span>
                </div>

                <p className="mt-3 mb-3"> <b> Skill Rating </b> </p>




                {props.skills.length > 0 ?

                  props.skills.map((x) => {

                    return (
                      <div key={x._id} >
                        <div className="d-flex justify-content-between mt-5 mb-4 row">
                          <div className="col-md-4 col-sm-4 ml-5 "> <span> <b>{x.skill}</b> </span> </div>
                          <div className="col-md-8 col-sm-8">
                            <div className="d-flex justify-content-end row">
                              <div className="col-md-6 col-sm-6">
                                <span> Anuj Rating </span>
                              </div>
                              <div className="col-md-6 col-sm-6">
                                <StarRating rating={x.rating} />
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr></hr>
                      </div>

                    )
                  }) : " "}

                <p className="mt-3 mb-3"> <b>Recommendation note  </b> </p>

                <p>   {props.description} </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GivenSection
