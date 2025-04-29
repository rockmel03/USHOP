import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  return (
    <nav className="px-5 py-4 flex items-center justify-between max-w-[1440px] mx-auto">
      <div>
        <h1 className="text-xl font-bold">USHOP</h1>
      </div>
      <div className="searchbar py-2 rounded-full shadow-lg max-w-md w-full flex items-center">
        <div className="flex-shrink-0 w-10 text-zinc-500 grid place-items-center">
          <i className="ri-search-2-line ri-lg"></i>
        </div>
        <input
          type="search"
          name="search"
          id="search"
          className="outline-none border-none w-full"
          placeholder="Search here..."
          autoComplete="off"
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
          <i className="ri-map-pin-2-fill ri-lg"></i>
        </div>
        <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
          <i className="ri-shopping-cart-2-fill ri-lg"></i>
        </div>
        {isAuthenticated ? (
          <div className="shadow flex items-center rounded-full">
            <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
              <i className="ri-account-circle-fill ri-lg"></i>
            </div>
            <p>{user?.fullname?.split(" ")[0] || "Account"}</p>
            <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer transition duration-200 ease">
              <i className="ri-arrow-down-s-line"></i>
            </div>
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
