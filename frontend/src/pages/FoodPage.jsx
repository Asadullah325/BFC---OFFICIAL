import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFoodsById } from "../services/foodService";
import { FaLocationDot } from "react-icons/fa6";
import { FaClock, FaHeart } from "react-icons/fa";
import StarRatings from "../components/StarRatings";
import Price from "../components/Price";
import Tags from "../components/Tags";

const FoodPage = () => {
  const [food, setfood] = useState({});

  const { id } = useParams();

  useEffect(() => {
    getFoodsById(id)
      .then((food) => {
        console.log("Fetched food:", food);
        setfood(food);
      })
      .catch((error) => console.error("Error fetching food:", error));
  }, [id]);

  return (
    <>
      <div>
        {food?.name && (
          <>
            <div className="flex justify-center items-start p-2 md:p-4 w-full h-screen">
              <div className="grid grid-cols-1 md:grid-cols-2 bg-amber-200 rounded-2xl w-screen  justify-start mb-10">
                <div className="p-4 flex flex-col items-center">
                  <img
                    src={food.image}
                    alt={food.name}
                    className=" mb-2 rounded-md shadow-md"
                  />
                </div>
                <div className="text-sm mb-2 flex flex-col gap-4 relative px-4 md:p-4 pb-10">
                  <div className="text-4xl font-bold mb-2">{food.name}</div>
                  <div className="flex items-center text-xl font-bold">
                    <FaClock className="mr-2 w-5 h-5" />
                    {food.cookTime}
                  </div>
                  <div className="flex items-center gap-1 flex-wrap text-xl font-bold">
                    <FaLocationDot className="w-5 h-5" />
                    {food.origins.map((origin) => (
                      <span key={origin}>{origin}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 flex-wrap">
                    <span className="mr-1 text-xl font-bold">Tags:</span>
                    {food.tags && (
                      <Tags
                        tags={food.tags.map((tag) => ({ name: tag }))}
                        forFoodPage={true}
                      />
                    )}
                  </div>
                  <div className="absolute top-5 right-5">
                    {food.favourite ? (
                      <FaHeart className="text-red-500 w-5 h-5 cursor-pointer" />
                    ) : (
                      <FaHeart className="text-gray-500 w-5 h-5 cursor-pointer" />
                    )}
                  </div>
                  <div className="font-semibold text-2xl absolute bottom-0 right-3">
                    <Price price={food.price} />
                  </div>
                  <div className="flex items-center gap-2">
                    <p className="text-xl font-bold">Rating:</p>
                    <StarRatings stars={food.stars} />
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="bg-[#C14600] text-white py-2 px-4 rounded-md cursor-pointer w-full">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default FoodPage;
