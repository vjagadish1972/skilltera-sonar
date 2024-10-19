import React from "react";
import UpdDelExpCandidate from "./UpdDelExpCandidate/updDelExpCandidate"

const ExperienceCardCandidate = (props) => {
  return (
      <div className="card mb-3" >
        <div className="card-body">
        <span style={{ fontWeight: "500", fontSize: "20px", color: "#444444" }}> <b>Experience</b></span>
          <UpdDelExpCandidate experience={props.experience} />
        </div>
      </div>
  )
}

export default ExperienceCardCandidate
