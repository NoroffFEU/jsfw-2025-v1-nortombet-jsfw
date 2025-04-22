import React from "react";
import { FaStar } from "react-icons/fa";

interface StarRatingProps {
  rating: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating }) => (
  <div className="flex">
    {[...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={i < Math.round(rating) ? "text-yellow-400" : "text-gray-300"}
      />
    ))}
    <span className="ml-2">({rating.toFixed(1)})</span>
  </div>
);

export default StarRating;
