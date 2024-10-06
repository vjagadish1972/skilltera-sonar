import React from "react";
import StarRating from "../../../../../../Component/StarRating/starRating";


const UpdDelSkill = (props) => {
  return (
    <>

      <div className="row border mb-3 mx-1">
        {props.skills && props.skills.map((x) => {
          return (
            <div className="previous-employer-box pt-2 m-2" style={{ height: "35px", width: "auto", borderRadius: "5px" }} >
              <span>{x?.skillId?.skill} </span>
            </div>
          )
        })}
      </div>


      <div className="updDel mt-4">
      {props.skills && props.skills.map(s => {
        return (
          <>
      <div className="skill-box-candidate">
        <div className="row">
          <div className="col-6">
            <span style={{ fontWeight: "400", fontSize: "16px", lineHeight: '19px', color: '#444444' }}>
              <b> {s.skillId?.skill}</b>
            </span>
          </div>
          <div className="col-6">
            <p style={{ fontSize: "1.1rem" }}>
              <StarRating rating={s.rating} style={{ color: 'orange' }} />
            </p>
          </div>
        </div>
        <div className="row">
          <div className="col-6">
            <span style={{ fontWeight: "400", fontSize: "14px", lineHeight: '16px', color: '#747474' }} >Experience </span>
          </div>
          <div className="col-6">
            <span style={{ fontWeight: "400", fontSize: "14px", lineHeight: '16px', color: '#747474' }}> {s.experience} Years</span>
          </div>
        </div>
      </div>

          </>
        )
      })}
      </div>

    </>
  )
}

export default UpdDelSkill;