import React from "react";
import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";

const StarRatings = ({ stars }) => {

  function Star({ number }) {
    const halfNumber = number - 0.5;

    return stars >= number ? (
      <FaStar  className="text-yellow-500 w-4 h-4"/>
    ) : stars >= halfNumber ? (
      <FaStarHalfAlt  className="text-yellow-500 w-4 h-4" />
    ) : (
      <FaStar className="w-4 h-4" />
    );
  }

  return (
    <>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((number) => (
          <Star key={number} number={number} />
        ))}
      </div>
    </>
  );
};

export default StarRatings;

