import React from "react";
const UpdDelCertifCandidate = (props) => {
  return (
    <>
      {/* certificate Edit  and del*/}
      {props.certificate && props.certificate.map(c => {
        return (
          <>
            <div className="border mb-3" style={{borderRadius:"4px"}}>
             
                <p className="m-2" style={{
                  fontWeight: "500",
                  fontSize: "16px",
                  color: "#444444",
                }} > <b>{c.name}</b> 
                </p>
            
              <p
                className="mx-2 "
                style={{
                  fontWeight: "500",
                  fontSize: "0.8rem",
                  color: "#444444",
                }}
              >
                {c.credentials}
                
              </p>
              <p className="mx-2 ">
                <a
                  href={c.verifyLink}
                  target="_blank"
                  style={{
                    fontWeight: "500",
                    fontSize: "14px",
                    color: "#444444",
                  }}> {c.verifyLink}</a></p>
            </div>
          </>
        )
      })}
    </>
  );
};

export default UpdDelCertifCandidate
