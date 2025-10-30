import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AuthRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  if (user) {
    if (user.role === "admin") {
      return <Navigate to="/dashboard" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AuthRoute;
