import React from "react";

const Button = ({ type, title, onClick, className }) => {
  return (
    <>
      <div className="flex items-center justify-end">
        <button type={type} onClick={onClick} className={className}>
          {title}
        </button>
      </div>
    </>
  );
};

export default Button;
