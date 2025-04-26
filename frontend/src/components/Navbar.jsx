import React from "react";

const Navbar = () => {
  const isLoggedIn = true;
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
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
          <i className="ri-map-pin-2-fill ri-lg"></i>
        </div>
        <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
          <i class="ri-shopping-cart-2-fill ri-lg"></i>
        </div>
        {isLoggedIn ? (
          <div className="shadow flex items-center rounded-full">
            <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
              <i class="ri-account-circle-fill ri-lg"></i>
            </div>
            <p>Account</p>
            <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer transition duration-200 ease">
              <i class="ri-arrow-down-s-line"></i>
            </div>
          </div>
        ) : (
          <button className="bg-blue-500 text-white px-3 py-1 rounded text-sm font-semibold">
            Sign In
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
