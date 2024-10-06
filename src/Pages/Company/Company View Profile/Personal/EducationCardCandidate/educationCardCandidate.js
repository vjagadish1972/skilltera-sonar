import React, { useState, useEffect, useContext } from "react";
import { BsPencil, BsPlusCircle, BsStar } from "react-icons/bs";



import UpdateEducationCandidate from "./UpdateEducationCandidate/updateEducationCandidate";


const EducationCard = (props) => {



  return (
    <>
      {/* Education */}

      <div className="card mb-3">
        <div className="card-body">

          <span
            style={{ fontWeight: "500", fontSize: "20px", color: "#444444" }}
          >
            <b> Education</b>
          </span>

          {/* {educationData.length > 0 ?
       
         educationData.map((x) => {    
              
           
           return( */}
          <UpdateEducationCandidate education={props.education} />

          {/* 
         )}) : " " }  */}

        </div>
      </div>

    </>
  );
};

export default EducationCard;
