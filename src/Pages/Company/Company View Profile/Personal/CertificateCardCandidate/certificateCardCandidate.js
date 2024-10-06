import React from "react";
import UpdDelCertifCandidate from "./UpdDelCertifCandidate/updDelCertifCandidate";;



const CertificateCardCandidate = (props) => {
  return (
    <>


      {/* Certificate */}

      <div className="card mb-3">
        <div className="card-body">


          <span
            style={{
              fontWeight: "500",
              fontSize: "20px",
              color: "#444444",
            }}
          >
            <b> Certificate</b>
          </span>

       <div className="mt-3">
          <UpdDelCertifCandidate certificate={props.certificate} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CertificateCardCandidate
