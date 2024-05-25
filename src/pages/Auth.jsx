import React, { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import loginImage from '../assets/loginImage.jpeg'
import signupImage from '../assets/signupImage.jpeg'

const Auth = () => {
  const location = useLocation();
  const isLogin = location.pathname === "/auth/login";
  const imageSrc = isLogin ? loginImage : signupImage;


  return (
    <>
      <div className=" flex flex-col sm:flex-row h-[100svh] sm:h-[100vh] w-[100svw]">
        <div className="w-[100%] sm:w-[50%] bg-gold_secondary h-[20vh] sm:h-[100%]">
          <img src={imageSrc} className=" w-[100%] h-[100%] object-cover" />
        </div>
        <div className="w-[100%] sm:w-[50%] h-[100%]">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default Auth;
