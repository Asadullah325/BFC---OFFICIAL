import React from "react";

const Title = ({title}) => {
  return (
    <>
      <div className="flex items-center justify-center p-2">
        <h1 className="text-4xl font-bold text-center text-amber-800">{title}</h1>
      </div>
    </>
  );
};

export default Title;
