import React from "react";
import { Link } from "react-router-dom";



const NotFound = ({ message, linkRoute, linkText }) => {
  return (
    <div className="flex flex-col items-center justify-center pt-5">
      <p className="text-4xl font-bold mb-4">{message}</p>
      <Link className="bg-[#C14600] text-white px-4 py-2 rounded-md" to={linkRoute}>
        {linkText}
      </Link>
    </div>
  );
};


export default NotFound;
