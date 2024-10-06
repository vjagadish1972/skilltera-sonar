import React from 'react'
import { AiOutlineCloseCircle } from "react-icons/ai";
import StarRating from "../../../../../Component/StarRating/starRating"

const GivenSection = () => {
  return (
    <>

      <div className="d-flex justify-content-between">
        <span
          style={{
            fontWeight: "500",
            fontSize: "1.2rem",
            color: "#444444",
          }}
        >
          Anuj
        </span>

        <button
          type="button"
          className="btn btn-outline-secondary"
          data-toggle="modal"
          data-target="#about"
        >
          view more
        </button>

        <div
          className="modal fade"
          id="about"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalCenterTitle"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content modalContent">
              <div className="modal-header">

                <h5 className="modal-title" id="exampleModalLongTitle">
                  Recommendation received
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
                  <span className="mt-1">Ashish Singh</span>
                  <span className="mt-1"> https://www.figma.com/file </span>
                  <span className="mt-1"> Email Address </span>
                </div>

                <p className="mt-3 mb-3"> <b> Skill Rating </b> </p>
                <div className="d-flex justify-content-between mt-5 mb-4 row">
                  <div className="col-md-4 col-sm-4 ml-5 "> <span> <b>Python</b> </span> </div>
                  <div className="col-md-8 col-sm-8">
                    <div className="d-flex justify-content-end row">
                      <div className="col-md-6 col-sm-6">
                        <span> Anuj Rating </span>
                      </div>
                      <div className="col-md-6 col-sm-6">
                        <StarRating />
                      </div>
                    </div>
                  </div>
                </div>
                <hr></hr>

                <p className="mt-3 mb-3"> <b>Recommendation note  </b> </p>

                <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ac ornare pellentesque magna praesent risus quis aliquet nulla. Auctor ut pharetra, vel quis varius. Commodo sed vitae nibh mattis ullamcorper id scelerisque libero ac. </p>

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GivenSection
