import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import loginImage from '../assets/loginImage.jpeg'
import signupImage from '../assets/signupImage.jpeg'
import AuthHook from "../context/AuthContext";

const Auth = () => {
  const { isLogedin } = AuthHook();
  const location = useLocation();
  const isLogin = location.pathname === "/auth/login";
  const imageSrc = isLogin ? loginImage : signupImage;

  const navigate = useNavigate()

  useEffect(() => {
    if (isLogedin) {
      navigate("/")
    }
  }, [])



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
