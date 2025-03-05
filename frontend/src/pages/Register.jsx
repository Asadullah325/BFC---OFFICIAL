import React from "react";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");
  const navigate = useNavigate();
  const { user, registerUser } = useAuth();

  React.useEffect(() => {
    if (user) {
      navigate(returnUrl || "/");
    }
  }, [user, navigate, returnUrl]);

  const submit = async (data) => {
    try {
      await registerUser(data);
    } catch (error) {
      console.log(error?.response?.data || "Registration failed");
    }
  };

  return (
    <>
      <div className="container mx-auto flex flex-col items-center p-2">
        <Title title="Register" />
        <form
          onSubmit={handleSubmit(submit)}
          noValidate
          className="flex flex-col p-3 bg-white shadow-md border-2 border-amber-700 rounded-md w-full md:w-100"
        >
          <Input
            type="text"
            name="name"
            placeholder={"John Doe"}
            label="Name"
            {...register("name", {
              required: "Name is required",
              minLength: {
                value: 3,
                message: "Name must be at least 3 characters",
              },
            })}
            error={errors.name}
            className="border border-amber-700 p-1 rounded-md mb-1 w-full placeholder:text-amber-300 outline-none text-amber-700"
          />
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder={"7uH5w@example.com"}
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={errors.email}
            className="border border-amber-700 p-1 rounded-md mb-1 w-full placeholder:text-amber-300 outline-none text-amber-700"
          />
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder={"********"}
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
            error={errors.password}
            className="border border-amber-700 p-1 rounded-md mb-1 w-full placeholder:text-amber-300 outline-none text-amber-700"
          />
          <Input
            type="password"
            name="confirmPassword"
            label="Confirm Password"
            placeholder={"********"}
            {...register("confirmPassword", {
              required: "Confirm Password is required",
              validate: (value) =>
                value === watch("password") || "Passwords do not match",
            })}
            error={errors.confirmPassword}
            className="border border-amber-700 p-1 rounded-md mb-1 w-full placeholder:text-amber-300 outline-none text-amber-700"
          />

          <Input
            type="text"
            name="address"
            label="Address"
            placeholder={"123 Main St, Anytown, USA"}
            {...register("address", {
              required: "Address is required",
              minLength: {
                value: 10,
                message: "Address must be at least 10 characters",
              },
            })}
            error={errors.address}
            className="border border-amber-700 p-1 rounded-md mb-1 w-full placeholder:text-amber-300 outline-none text-amber-700"
          />

          <Button
            type="submit"
            title="Register"
            className="bg-amber-700 mt-1 p-1 px-10 rounded-md text-white font-semibold border-2 border-amber-700 cursor-pointer hover:bg-white hover:text-amber-700"
          />
          <p className="mt-2 text-amber-700">
            Already have an account?{" "}
            <Link
              to={`/login${returnUrl ? `?returnUrl=${returnUrl}` : ""}`}
              className="text-amber-700 font-bold hover:underline hover:text-amber-700"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </>
  );
};

export default Register;
