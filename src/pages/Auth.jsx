import React, { useState } from "react";
import "./FormStyle.css";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const Auth = () => {
  const [formType, setFormType] = useState("signIn");

  const handleToggle = (type) => {
    setFormType(type);
  };

  const containerClass =
    "container " + (formType === "signUp" ? "right-panel-active" : "");

  return (
    <>
      <div className="flex justify-center items-center h-screen">
        <div className="App">
          <div className={containerClass} id="container">
            <SignUp toggleForm={() => handleToggle("signIn")} />
            <SignIn toggleForm={() => handleToggle("signUp")} />
            <div className="overlay-container">
              <div className="overlay">
                <div className="overlay-panel overlay-left">
                  <h1>Welcome Back!</h1>
                  <p>
                    To keep connected with us please login with your personal
                    info
                  </p>
                  <button
                    className="ghost"
                    id="signIn"
                    onClick={() => handleToggle("signIn")}
                  >
                    Sign In
                  </button>
                </div>
                <div className="overlay-panel overlay-right">
                  <h1>Hello, Friend!</h1>
                  <p>Enter your personal details and start journey with us</p>
                  <button
                    className="ghost "
                    id="signUp"
                    onClick={() => handleToggle("signUp")}
                  >
                    Sign Up
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Auth;
