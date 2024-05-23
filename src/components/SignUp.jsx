import React from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";

function SignUp({ toggleForm }) {
  const url = import.meta.env.VITE_BACKEND;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post(`${url}/auth/signup`, data);
      setCookie("authtoken", response.data.token);
      toast.success("Account created successfully");
      reset();
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="form-container sign-up-container">
      <div className="formm">
        <h1>Create Your Account</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errors.name && (
            <span className=" text-start text-red-500">
              {errors.name.message}
            </span>
          )}
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
          />
          {errors.email && (
            <span className="text-red-500">{errors.email.message}</span>
          )}
          <input
            type="text"
            placeholder="Email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+\.\S+$/,
                message: "Invalid email address",
              },
            })}
          />
          {errors.mobileNo && (
            <span className="text-red-500">{errors.mobileNo.message}</span>
          )}
          <input
            type="number"
            placeholder="Phone Number"
            {...register("mobileNo", { required: "Mobile number is required" })}
          />
          {errors.password && (
            <span className="text-red-500">{errors.password.message}</span>
          )}
          <input
            type="password"
            placeholder="Password"
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Password must be at least 6 characters",
              },
            })}
          />
          <button type="submit" className="mb-3">
            Sign Up
          </button>
          <button onClick={toggleForm} className="ghost">
            Sign In
          </button>{" "}
          {/* Toggle button */}
        </form>
      </div>
    </div>
  );
}

export default SignUp;
