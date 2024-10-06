import React, { useState, useEffect } from "react";
import { DateConverterTypeSec, DateFieldShow } from "../../../../../../UtilitiesFunctions/utilitiesFunction";

const UpdDelExpCandidate = (props) => {
  return (
    <div>
      {props.experience && props.experience.map((exp ,index) => {
        return (
          <div key={index} >
          {index > 0 && (
                   <div className="d-flex" style={{ height: '70px' }}>
                     <div className="vr" style={{ backgroundColor:'black', width: '1px' }} ></div>
                   </div>
                 )}
            <div className="d-flex justify-content-between mt-3"   >

              <div className="d-flex justify-content-start mt-1 ">
                <p
                  style={{
                    fontWeight: "500",
                    fontSize: "16px",
                    color: "#444444",
                  }}
                >
                  <b> {exp.company.toUpperCase()} </b> &nbsp;&nbsp;&nbsp;&nbsp;
                  {DateConverterTypeSec(exp.startDate)} &nbsp;&nbsp;
                  <b>to</b>&nbsp;&nbsp;
                  {DateConverterTypeSec(exp.endDate)}
                </p>
              </div>

            </div>

            <div className="mt-2">
              <spna style={{ fontSize: "15px" }} > <b> {exp.designation} </b> </spna>
            </div>
            <div className="row mt-3">
              <span style={{ fontSize: "14px", color:"#444444" , paddingRight: "5%", textAlign: "justify" }} >
                {exp.description}
              </span>
            </div>
            
          </div>
        )
      })}


    </div>
  )
}

export default UpdDelExpCandidate
