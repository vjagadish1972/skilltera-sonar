import React from "react";


const UpdateEducationCandidate = (props) => {
  return (
    <>
      {props.education && props.education.map((e ,index) => {
        return (
          <div key={index} >
           {index > 0 && (
                    <div className="d-flex" style={{ height: '70px' }}>
                      <div className="vr" style={{ backgroundColor:'black', width: '1px' }} ></div>
                    </div>
                  )}
            <div className="d-flex justify-content-between mt-3">
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#444444",
                }}>

                <b> {e.school}</b>
              </span>


            </div>

            <div className="d-flex justify-content-start mt-2 ">
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "14px",
                  color: "#444444",
                }}
              >
                {e.degree}  &nbsp;&nbsp;&nbsp;&nbsp; {(e.startDate).split('T')[0]} &nbsp;&nbsp;to&nbsp;&nbsp; {(e.endDate).split('T')[0]} 
              </span>
            </div>

            <div className="mt-2" >
              <span
                style={{
                  fontWeight: "500",
                  fontSize: "14px",
                  color: "#444444",
                }}
              >
                {e.description}
              </span>
            </div>
  
          </div>
        )
      })}
    </>
  );
};

export default UpdateEducationCandidate
