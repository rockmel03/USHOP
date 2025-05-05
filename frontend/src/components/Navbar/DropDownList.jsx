import React from "react";
import { useSelector } from "react-redux";

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
      {isAuthenticated && user.role === "seller" && (
        <div className="px-2 py-1 shadow">
          <span className="mr-2">
            <i className="ri-function-add-line"></i>
          </span>
          <span>Add Product</span>
        </div>
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
