import React from "react";
import { Link } from "react-router-dom";

const Tags = ({ tags , forFoodPage}) => {
  return (
    <>
      <div className="flex flex-wrap gap-2" style={
        {
            justifyContent: forFoodPage ? "start" : "center"
        }
      }>
        {tags.map((tag) => (
          <Link
            key={tag.name}
            to={`/tag/${tag.name}`}
            className="bg-[#C14600] text-white px-2 py-1 rounded-md"
          >
            {tag.name}
            {!forFoodPage && ` (${tag.count})`}
          </Link>
        ))}
      </div>
    </>
  );
};

export default Tags;
