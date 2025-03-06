import React from "react";

const Title = ({ title, fontSize }) => {
  return (
    <>
      <div className="flex items-center justify-center p-2">
        <h1
          className="text-4xl font-bold text-center text-amber-800"
          style={{ fontSize }}
        >
          {title}
        </h1>
      </div>
    </>
  );
};

export default Title;
