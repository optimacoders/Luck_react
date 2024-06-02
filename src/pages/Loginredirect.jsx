import React from "react";
import { useNavigate } from "react-router-dom";

const Loginredirect = () => {
  const navigate = useNavigate();

  return (
    <div>
      <div className=" w-[100svw] h-[100svh] flex flex-col justify-center items-center gap-2 relative p-2 md:p-0">
        <img
          src={""}
          alt="logo"
          className=" absolute left-5 top-5"
          width={100}
        />
        <h1 className=" text-gold_dark text-[40px] font-semibold">
          Unauthenticated
        </h1>
        <button
          onClick={() => navigate("/auth")}
          className=" hover:bg-gold_dark hover:text-white bg-gray-100 border px-4 py-[6px] rounded font-medium text-gray-500 text-sm"
        >
          Login or Signup
        </button>
      </div>
    </div>
  );
};

export default Loginredirect;
