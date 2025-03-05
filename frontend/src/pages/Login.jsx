import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Title from "../components/Title";
import Input from "../components/Input";
import Button from "../components/Button";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [searchParams] = useSearchParams();
  const returnUrl = searchParams.get("returnUrl");

  useEffect(() => {
    if (user) {
      navigate(returnUrl || "/");
    }
  }, [user, navigate, returnUrl]);

  const submit = async ({ email, password }) => {
    try {
      await login(email, password);
    } catch (error) {
      console.log(error?.response?.data || "Login failed");
    }
  };

  return (
    <div className="container mx-auto flex flex-col items-center p-2">
      <Title title="Login" />
      <form
        onSubmit={handleSubmit(submit)}
        noValidate
        className="flex flex-col p-3 bg-white shadow-md border-2 border-amber-700 rounded-md w-full md:w-100"
      >
        <Input
          type="email"
          label="Email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
          error={errors.email}
          className="border border-amber-700 p-1 rounded-md mb-1 w-full placeholder:text-amber-700 outline-none text-amber-700"
        />

        <Input
          type="password"
          label="Password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.password}
          className="border border-amber-700 p-1 rounded-md mb-1 w-full placeholder:text-amber-700 outline-none text-amber-700"
        />

        <Button
          type="submit"
          title="Login"
          className="bg-amber-700 mt-1 p-1 px-10 rounded-md text-white font-semibold border-2 border-amber-700 cursor-pointer hover:bg-white hover:text-amber-700"
        />
      </form>
    </div>
  );
};

export default Login;
