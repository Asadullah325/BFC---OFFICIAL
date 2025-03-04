import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
  const [term, setTerm] = useState("");
  const navigate = useNavigate();
  const { searchTerm } = useParams();

  useEffect(() => {
    setTerm(searchTerm || "");
  }, [searchTerm]);

  const search = async () => {
    term ? navigate(`/search/${term}`) : navigate("/");
  };

  return (
    <>
      <div className="flex justify-end items-center p-2 px-5">
        <div className="flex items-center">
          <input
            type="text"
            className="p-2 border border-gray-300 border-r-0 rounded-md rounded-r-none focus:outline-none focus:border-gray-500"
            placeholder="Search for food"
            onChange={(e) => setTerm(e.target.value)}
            onKeyUp={(e) => e.key === "Enter" && search()}
            value={term}
          />
          <button
            className="p-2 bg-[#C14600] text-white rounded-md rounded-l-none cursor-pointer"
            onClick={search}
          >
            Search
          </button>
        </div>
      </div>
    </>
  );
};

export default Search;
