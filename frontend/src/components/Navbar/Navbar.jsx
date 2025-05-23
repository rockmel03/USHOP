import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DropDownList } from "./DropDownList";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const [dropDown, setDropDown] = useState(false);
  return (
    <nav className="px-5 py-4 flex items-center justify-between max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-xl font-bold">USHOP</h1>
      </div>
      <div className="w-full max-w-md">
        <SearchBar />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
          <i className="ri-map-pin-2-fill ri-lg"></i>
        </div>
        <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
          <i className="ri-shopping-cart-2-fill ri-lg"></i>
        </div>
        {isAuthenticated ? (
          <div
            onClick={() => setDropDown((prev) => !prev)}
            className="relative shadow flex items-center rounded-full"
          >
            <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
              <i className="ri-account-circle-fill ri-lg"></i>
            </div>
            <p>{user?.fullname?.split(" ")[0] || "Account"}</p>
            <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer transition duration-200 ease">
              {dropDown ? (
                <i className="ri-arrow-up-s-line"></i>
              ) : (
                <i className="ri-arrow-down-s-line"></i>
              )}
            </div>
            {dropDown && (
              <div className="absolute top-[101%] right-0 z-10 w-3xs max-w-sm bg-white shadow rounded-lg p-4">
                <DropDownList />
              </div>
            )}
          </div>
        ) : (
          <Link to="/login">
            <div className="shadow flex items-center rounded-full">
              <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
                <i className="ri-login-box-line ri-lg"></i>
              </div>
              <p className="mr-3 text-gray-500">Login</p>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
