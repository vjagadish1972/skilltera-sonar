import React, { useState } from "react";
import "./starRating.css";
import { BsStarFill } from "react-icons/bs";

const StarRating = (props) => {
  const [rating, setRating] = useState(props.rating);

  const [hover, setHover] = useState(0);
  return (
    <div className="star-rating" style={{ pointerEvents: "none" }}>
      {[...Array(5)].map((_, index) => {
        index += 1; // Ensure the index starts at 1 instead of 0
        return (
          <button
            type="button"
            key={index} // Using the index is acceptable here due to the fixed nature of the list
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star m-1">
              <BsStarFill size={20} />
            </span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
