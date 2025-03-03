import React from "react";
import { FaClock, FaHeart } from "react-icons/fa";
import StarRatings from "./StarRatings";
import { FaLocationDot } from "react-icons/fa6";
import Price from "./Price";
import { Link } from "react-router-dom";

const Thumbnail = ({ foods }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
      {foods.map((food) => (
        <div
          key={food.id}
          className="rounded shadow-md p-4 flex flex-col items-center bg-yellow-200"
        >
          <Link to={`/food/${food.id}`}>
            <img
              src={food.image}
              alt={food.name}
              className="w-[300px] h-[200px] mb-2 rounded-md shadow-md"
            />
          </Link>
          <Link
            to={`/food/${food.id}`}
            className="text-lg font-semibold mb-2 hover:underline"
          >
            {food.name}
          </Link>
          <div className="text-sm mb-2 flex flex-col gap-2 w-full relative">
            <div className="flex items-center">
              <FaClock className="mr-2 w-5 h-5" />
              {food.cookTime}
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              <FaLocationDot className="w-5 h-5" />
              {food.origins.map((origin) => (
                <span key={origin}>{origin}</span>
              ))}
            </div>
            <div className="flex items-center gap-1 flex-wrap">
              <span className="font-semibold mr-1">Tags:</span>
              {food.tags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="absolute top-2 right-2">
              {food.favourite ? (
                <FaHeart className="text-red-500 w-5 h-5" />
              ) : (
                <FaHeart className="text-gray-500 w-5 h-5" />
              )}
            </div>
            <div className="font-semibold text-2xl absolute -bottom-5 right-0">
              <Price price={food.price} />
            </div>
            <div className="flex items-center gap-2">
              <p className="font-semibold">Rating:</p>
              <StarRatings stars={food.stars} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Thumbnail;
