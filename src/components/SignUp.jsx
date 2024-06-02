import React, { useState } from "react";
import { useForm } from "react-hook-form";
// //import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import AuthHook from "../context/AuthContext";
import { PulseLoader } from "react-spinners"

function SignUp() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setisLogedin, settoken, token, isLogedin } = AuthHook();
  const [loader, setloader] = useState(false)

  const url = import.meta.env.VITE_BACKEND;

  const onSubmit = async (data) => {
    try {
      setloader(true)
      const response = await axios.post(`${url}/auth/signup`, {
        name: data.name,
        email: data.email,
        mobileNo: data.mobileNo,
        password: data.password,
      });
      const res = response.data;
      if (res.status) {
        toast.success(res?.message);
        Cookies.set("token", res?.token, { expires: 7 });
        settoken(res?.token);
        setisLogedin(true);
        navigate("/");
      }
    } catch (error) {
      console.log(error.response);
      toast.error(error?.response?.data?.message || "Something went wrong.");
    }
    setloader(false)
  };

  return (
    <div className=" flex flex-col items-center justify-center h-full w-full px-5 sm:px-20">
      <section className=" flex justify-start w-full">
        <img src={""} width={90} />
      </section>
      <section className="w-full my-2">
        <h1 className=" text-3xl font-bold">Create Account !</h1>
        <p className=" text-gray-600 font-medium text-sm">
          SignUp to shop your fashion ideas.
        </p>
      </section>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
        <div className=" my-[6px]">
          <label className=" text-gray-500 w-full text-sm  font-medium my-1">
            Name
          </label>
          <br />
          <input
            type="text"
            {...register("name", {
              required: "name is required",
              pattern: {
                value: /^[A-Za-z]+$/,
                message: "name can only contain letters.",
              },
            })}
            placeholder="Enter Name"
            className=" px-3 py-[6px] mt-2 w-full rounded-lg border focus:outline-none focus:border-black"
          />
          {errors.name && (
            <span className=" text-red-600 text-xs font-medium">
              * {errors.name.message}
            </span>
          )}
        </div>
        <div className=" my-[6px]">
          <label className=" text-gray-500 w-full text-sm  font-medium my-1">
            Email
          </label>
          <br />
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            placeholder="Enter Email"
            className=" px-3 py-[6px] mt-2 w-full rounded-lg border focus:outline-none focus:border-black"
          />
          {errors.email && (
            <span className=" text-red-600 text-xs font-medium">
              * {errors.email.message}
            </span>
          )}
        </div>
        <div className=" my-[6px]">
          <label className=" text-gray-500 w-full text-sm font-medium my-1">
            Password
          </label>
          <br />
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
            })}
            placeholder="Enter Password"
            className=" px-3 py-[6px] mt-2 w-full rounded-lg border focus:outline-none focus:border-black"
          />
          {errors.password && (
            <span className=" text-red-600 text-xs font-medium">
              * {errors.password.message}
            </span>
          )}
        </div>
        <div className=" my-[6px]">
          <label className=" text-gray-500 w-full text-sm font-medium my-1">
            Mobile Number
          </label>
          <br />
          <input
            type="number"
            {...register("mobileNo", {
              required: "mobile number is required",
            })}
            placeholder="Enter mobile  number"
            className=" px-3 py-[6px] mt-2 w-full rounded-lg border focus:outline-none focus:border-black"
          />
          {errors.mobileNo && (
            <span className=" text-red-600 text-xs font-medium">
              * {errors.mobileNo.message}
            </span>
          )}
        </div>
        <button
          type="submit"
          className="  bg-gold_medium hover:bg-gold_dark px-6 my-1 h-8 flex items-center text-white rounded-full font-medium"
        >
          {
            loader ? <PulseLoader color="white" size={10} /> : "SignUp"
          }
        </button>
      </form>
      <p className=" text-sm my-4 font-medium">
        Already have account?{" "}
        <u
          className=" text-blue-600 cursor-pointer"
          onClick={() => navigate("/auth/login")}
        >
          Login Here
        </u>
      </p>
    </div>
  );
}

export default SignUp;
