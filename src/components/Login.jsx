import React, { useState } from "react";
import { useForm } from "react-hook-form";
// //import logo from "../Assets/logo.png";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import Cookies from "js-cookie";
import AuthHook from "../context/AuthContext";
import { PulseLoader } from "react-spinners"

function Login() {
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
      const response = await axios.post(`${url}/auth/login`, {
        email: data.email,
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
    <div className=" flex flex-col items-center justify-center h-full w-full px-5 sm:px-20 border">
      <section className=" flex justify-start w-full">
        <img src={""} width={120} alt="212" />
      </section>
      <section className="w-full my-5">
        <h1 className=" text-3xl font-bold">Welcome Back!</h1>
        <p className=" text-gray-500 font-medium ">
          Login to shop your fashion ideas.
        </p>
      </section>
      <form onSubmit={handleSubmit(onSubmit)} className=" w-full">
        <div className=" my-[6px]">
          <label className="text-gray-500 w-full text-sm  font-medium my-1">
            Email:
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
          <label className="  text-gray-500 w-full text-sm  font-medium my-1">
            Password:
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
        <section className=" flex justify-end w-full my-1">
          <p className=" text-xs text-blue-600 font-medium self-end">
            Forget Password ?
          </p>
        </section>
        <button
          type="submit"
          className="  bg-gold_medium hover:bg-gold_dark px-6 my-1 h-8 flex items-center text-white rounded-full font-medium"
        >
          {
            loader ? <PulseLoader color="white" size={10} /> : "Login"
          }
        </button>
      </form>
      <p className=" text-sm my-4 font-medium">
        Don't have account?{" "}
        <u
          className=" text-blue-600 cursor-pointer"
          onClick={() => navigate("/auth/signup")}
        >
          Register Here
        </u>
      </p>
    </div>
  );
}

export default Login;
