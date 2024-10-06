import React, { useState, useEffect, useContext } from "react";
import './updDelSkill.css'
import StarRating from "../../../../Component/StarRating/starRating";
import { Rating } from "react-simple-star-rating";


const UpdDelSkill = (props) => {


  return (
    <>
      {/* skill  */}


      <div className="skill-box-candidate">
        <div className="row">
          <div className="col-6">
            <span style={{ fontWeight: "400", fontSize: "16px", lineHeight: '19px', color: '#444444' }}>
              <b> {props.skill}</b>
            </span>
          </div>
          <div className="col-6">
            <p style={{ fontSize: "1.1rem" }}>
              {/* <StarRating rating={props.rating} style={{ color: 'orange' }} /> */}
              <Rating initialValue={props?.rating} fillColor='#4B2DFF' size='23px' />
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <span style={{ fontWeight: "400", fontSize: "14px", lineHeight: '16px', color: '#747474' }} >Experience </span>
          </div>
          <div className="col-6">
            <span style={{ fontWeight: "400", fontSize: "14px", lineHeight: '16px', color: '#747474' }}> {props.experience} Years</span>
          </div>
        </div>
      </div>

    </>
  )
}

export default UpdDelSkill