import React, { useState, useEffect, useContext } from "react";
import './updDelSkillUser.css'
import StarRating from "../../../Component/StarRating/starRating";


const UpdDelSkillUser = (props) => {
  return (
    <>
      {/* skill  */}


      <div className="skill-box">
        <div className="row">
          <div className="col-6">
            <span style={{ fontWeight: "400", fontSize: "16px", lineHeight: '19px', color: '#444444' }}>
              <b> {props.skill}</b>
            </span>
          </div>
          <div className="col-6">
            <p style={{ fontSize: "1.1rem" }}>
              <StarRating rating={props.rating} style={{ color: 'orange' }} />
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <span style={{ fontWeight: "400", fontSize: "14px", lineHeight: '16px', color: '#747474' }} >Experience (in years) </span>
          </div>
          <div className="col-6">
            <span style={{ fontWeight: "400", fontSize: "14px", lineHeight: '16px', color: '#747474' }}> {props.experience}</span>
          </div>
        </div>
      </div>

    </>
  )
}

export default UpdDelSkillUser