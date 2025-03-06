import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

const AuthRoute = ({ children }) => {
  const location = useLocation();
  const { user } = useAuth();

  return user ? (
    <>{children}</>
  ) : (
    <Navigate to={`/login?returnUrl=${location.pathname}`} replace />
  );
};

export default AuthRoute;
