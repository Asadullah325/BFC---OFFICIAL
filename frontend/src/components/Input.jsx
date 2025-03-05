import React from "react";
import InputContainer from "./InputContainer";

const Input = (
  {
    label,
    type,
    name,
    placeholder,
    className,
    onChange,
    value,
    defaultValue,
    onBlur,
    error,
  },
  ref
) => {
  const getErrorMessage = () => {
    if (!error) return;
    if (error.message) return error.message;

    switch (error.type) {
      case "required":
        return "This field is required";
      case "minLength":
        return "Field is too short";
      default:
        return "Something went wrong";
    }
  };

  return (
    <>
      <InputContainer label={label}>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          className={className}
          onChange={onChange}
          value={value}
          defaultValue={defaultValue}
          onBlur={onBlur}
          ref={ref}
        />
        {error && <p className="text-red-500">{getErrorMessage()}</p>}
      </InputContainer>
    </>
  );
};

export default React.forwardRef(Input);
