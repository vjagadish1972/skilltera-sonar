import React from "react";

const AboutCardCandidate = (props) => {
  return (
    <>
      {/* About */}

      <div className="card mb-2" id="personalData">
        <div className="card-body">
          <div className="d-flex justify-content-between">
            <span
              style={{
                fontWeight: "500",
                fontSize: "20px",
                color: "#444444",
              }}
            >
              <b>About</b>
            </span>
          </div>
          
          {/* <div className="row mt-4">
            <p style={{ fontSize: "1.1rem" }} dangerouslySetInnerHTML={{ __html: props.experienceSummary}}  >
            </p>
          </div> */}


          <div className="row mt-1 " style={{ marginRight: "5%" }} >

            <p style={{ alignContent: 'justify', textAlign: 'justify' ,fontSize:'16px' ,color: "#444444"}}
              dangerouslySetInnerHTML={{ __html: props.experienceSummary }}
            >
            </p>
          </div>

        </div>
      </div>

    </>
  );
};

export default AboutCardCandidate
