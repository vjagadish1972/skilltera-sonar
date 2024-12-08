import React, { useState } from "react";
import "./starRating.css";
import { BsStarFill } from "react-icons/bs";

const StarRating = (props) => {
  const [rating, setRating] = useState(props.rating);

  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating" style={{ pointerEvents: "none" }}>
    {[...Array(5)].map((star, index) => {
      const starId = `star-${index + 1}`; // Create a unique key based on the index
      return (
        <button
          type="button"
          key={starId} // Use unique key instead of the index
          className={index + 1 <= (hover || rating) ? "on" : "off"}
          onClick={() => setRating(index + 1)}
          onMouseEnter={() => setHover(index + 1)}
          onMouseLeave={() => setHover(rating)}
        >
          <span className="star m-1"> <BsStarFill size={20} /> </span>
        </button>
      );
    })}
  </div>
  );
};

export default StarRating;
