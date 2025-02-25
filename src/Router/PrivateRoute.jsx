import { AuthContext } from "@/Provider/AuthProvider";
import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();
  if (loading) {
    return <div>loading...</div>;
  }

  if (user && user?.email) {
    return children;
  }

  return <Navigate state={location.pathname} to={"/SignIn"}></Navigate>;
};

export default PrivateRoute;
