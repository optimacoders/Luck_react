import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const SignIn = ({ toggleForm }) => {
  const url = import.meta.env.VITE_BACKEND;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${url}/auth/login`, {
        email: email,
        password: password,
      });
      console.log(response.data);
      toast.success("login successfully");
      navigate("http://localhost:3000");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="form-container sign-in-container">
      <div className="formm">
        <h1>Sign in </h1>
        <input
          type="text"
          placeholder="Email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          id="password"
          value={password}
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className="mb-3">
          Login
        </button>
        <button onClick={toggleForm} className="ghost">
          Sign Up
        </button>{" "}
        {/* Toggle button */}
      </div>
    </div>
  );
};

export default SignIn;
