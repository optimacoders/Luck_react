import React from "react";
import { Route, Navigate } from "react-router-dom";
import AuthHook from "../context/AuthContext";

const PrivateRoute = ({ element, ...rest }) => {
  const { isLogedin } = AuthHook();

  return isLogedin ? (
    <Route {...rest} element={element} />
  ) : (
    <Navigate to="/auth/login" replace />
  );
};

export default PrivateRoute;
