import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const DropDownList = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <div className="flex flex-col gap-1">
      <div className="px-2 py-1 shadow">
        <span className="mr-2">
          <i className="ri-profile-line"></i>
        </span>
        <span>Profile</span>
      </div>
      {isAuthenticated && ["seller", "admin"].includes(user.role) && (
        <Link to="/dashboard">
          <div className="px-2 py-1 shadow">
            <span className="mr-2">
              <i className="ri-dashboard-line"></i>
            </span>
            <span>Dashboard</span>
          </div>
        </Link>
      )}
      {isAuthenticated && (
        <div className="px-2 py-1 shadow">
          <span className="mr-2">
            <i className="ri-logout-box-r-line"></i>
          </span>
          <span>Logout</span>
        </div>
      )}
    </div>
  );
};
