import { useState } from "react";
import "./style.css";

const StarRating = ({ ratingValue, onChange }) => {
    const [rating, setRating] = useState(ratingValue);
    const handleClick = (value) => {
        setRating(value);
        onChange(value);
    };
    return (
        <div className="st__star-rating">
            {[1, 2, 3, 4, 5].map((value) => {
                let active = value <= rating ? true : false;
                return (
                    <span
                        key={value}
                        className={active ? "st__star active" : "st__star"}
                        onClick={() => handleClick(value)}
                    >
                        &#9733;
                    </span>
                );
            })}
        </div>
    );
};
StarRating.defaultProps = {
    ratingValue: 0,
    onChange: () => {},
};
export default StarRating;
