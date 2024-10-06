import React, { useState, useEffect, useContext } from "react";



import UpdDelSkillCandidate from "./UpdDelSkillCandidate/updDelSkillCandidate";


const SkillCardCandidate = (props) => {


  return (
    <>


      {/* Skill */}

      <div className="card mb-3">
        <div className="card-body">

         <span
              style={{
                fontWeight: "500",
                fontSize: "20px",
                color: "#444444",
              }}
            >
              <b>Technical / Soft / Personal Skills</b>
            </span>


          
             <UpdDelSkillCandidate skills={props.skills} />
           


        </div>
      </div>


    </>
  )
}

export default SkillCardCandidate