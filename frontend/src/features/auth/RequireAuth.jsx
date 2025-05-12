import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
const RequireAuth = ({ roles = [] }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const location = useLocation();

  return isAuthenticated ? (
    roles.length === 0 || roles.includes(user.role) ? (
      <Outlet />
    ) : (
      <Navigate to="/unauthorised" state={location} replace={true} />
    )
  ) : (
    <Navigate to="/login" state={location} />
  );
};

export default RequireAuth;
