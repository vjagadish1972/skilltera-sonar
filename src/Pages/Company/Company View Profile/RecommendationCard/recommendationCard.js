
import React from "react";
import "./recommendation.css";
import ApprovedRecomm from "./ApprovedRecomm/approvedRecomm";

const RecommendationCard = (props) => {

    console.log("reco : " ,props.approvedRecomData)

  return (
    <>
      {/* Recommendation */}

      <div className="card mb-3 candidate-global-section">
        <div className="card-body">

          <div className="d-flex justify-content-between ">

          <span style={{ fontWeight: "500", fontSize: "20px", color: "#444444" }}> <b> Recommendation</b></span>

          </div>

          {props.approvedRecomData && props.approvedRecomData.map(x => {
            return(
                <div key={x._id}>
                    <ApprovedRecomm {...x}/>
                </div>
            )
           })}

          
        </div>
      </div>
    </>
  )
}

export default RecommendationCard