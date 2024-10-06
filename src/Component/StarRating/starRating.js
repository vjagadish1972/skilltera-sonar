import React, { useState } from 'react'
import './starRating.css'
import { BsStarFill } from "react-icons/bs";

const StarRating = (props) => {
  const [rating, setRating] = useState(props.rating)

  const [hover, setHover] = useState(0)
  return (

    <div className="star-rating" style={{ pointerEvents: "none" }} >
      {[...Array(5)].map((star, index) => {
        index += 1;
        return (
          <button
            type="button"
            key={index}
            className={index <= (hover || rating) ? "on" : "off"}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            {/* <span className="star">&#9733;</span> */}
            <span className="star m-1"> <BsStarFill size={20} /> </span>
          </button>
        );
      })}
    </div>
  )
}


export default StarRating
