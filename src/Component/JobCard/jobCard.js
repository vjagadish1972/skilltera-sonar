import React from "react";
import "./jobCard.css";
import { Rating } from "react-simple-star-rating";
import PropTypes from "prop-types";

const JobCard = (props) => {
  const isSelected = props.selectedCard === props._id;
  const currentDate = new Date();
  const targetDate = new Date(props.postedOn);
  const timeDiff = currentDate.getTime() - targetDate.getTime();
  const dayDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

  const handleClick = () => {
    props.onDataChange("new Data");
    props.handleCardClick(props?._id);
  };

  const boxStyle = {
    border: `3px solid ${isSelected ? "#FF8B02" : "gray"}`,
    padding: "10px",
    transition: "height 0.5s",
  };

  return (
    <div
      className="container jobcard m-1"
      style={boxStyle}
      role="button"
      tabIndex={0}
      onClick={handleClick}
    >
      <div>
        <p className="card-title" style={{ fontSize: "1rem" }}>
          {" "}
          <b>{props.jobTitle}</b>
          <span
            style={{ color: "#FF8C04", fontSize: "11px", marginLeft: "8%" }}
          >
            {" "}
            {dayDiff} Day ago{" "}
          </span>
        </p>
        <p style={{ fontSize: "0.9rem", fontWeight: "500" }}>
          {" "}
          {props.companyId !== null ? props.companyId.companyName : ""}{" "}
          <span>
            {props.country} {props.state} {props.city}{" "}
          </span>{" "}
        </p>
        <div className="d-flex flex-wrap">
          <p
            style={{ fontSize: "12px", color: "#8F8F8F", fontStyle: "italic" }}
          >
            Skills Required
          </p>
          {props.skillRequired !== null
            ? props.skillRequired.map((ele, i) => {
                return (
                  <p className="skillBox text-center" key={ele?.skillId?.id || i}>
                    {" "}
                    {ele?.skillId?.skill}{" "}
                    <Rating
                      initialValue={ele.rating}
                      fillColor="#4B2DFF"
                      size="23px"
                      readonly
                    />{" "}
                  </p>
                );
              })
            : ""}
        </div>

        <div className="d-flex flex-wrap mt-2">
          <span
            style={{ fontSize: "12px", color: "#8F8F8F", fontStyle: "italic" }}
          >
            {" "}
            Job Type{" "}
          </span>
          <p className="skillBox text-center"> {props.jobType}</p>
        </div>
      </div>
    </div>
  );
};

// Define PropTypes
JobCard.propTypes = {
  selectedCard: PropTypes.string.isRequired,
  _id: PropTypes.string.isRequired,
  postedOn: PropTypes.string.isRequired,
  jobTitle: PropTypes.string.isRequired,
  companyId: PropTypes.shape({
    companyName: PropTypes.string,
  }),
  country: PropTypes.string,
  state: PropTypes.string,
  city: PropTypes.string,
  skillRequired: PropTypes.arrayOf(
    PropTypes.shape({
      skillId: PropTypes.shape({
        id: PropTypes.string,
        skill: PropTypes.string,
      }),
      rating: PropTypes.number,
    })
  ),
  jobType: PropTypes.string.isRequired,
  onDataChange: PropTypes.func.isRequired,
  handleCardClick: PropTypes.func.isRequired,
};

// Default Props (if needed)
JobCard.defaultProps = {
  companyId: null,
  country: "",
  state: "",
  city: "",
  skillRequired: [],
};

export default JobCard;
