import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { DropDownList } from "./DropDownList";
import SearchBar from "./SearchBar";
import { selectCartTotalQuantity } from "../../features/cart/cartSlice";
import Dropdown from "../Dropdown";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const totalCartQuantity = useSelector(selectCartTotalQuantity);

  const [dropDown, setDropDown] = useState(false);
  return (
    <nav className="px-5 py-4 flex items-center justify-between max-w-[1440px] mx-auto">
      <Link to="/">
        <h1 className="text-xl font-bold">USHOP</h1>
      </Link>
      <div className="w-full max-w-xs lg:max-w-lg">
        <SearchBar />
      </div>
      <div className="flex items-center gap-2">
        <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
          <i className="ri-map-pin-2-fill ri-lg"></i>
        </div>
        <Link to="/cart">
          <div className="relative flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
            <span>
              <i className="ri-shopping-cart-2-fill ri-lg"></i>
            </span>
            {totalCartQuantity > 0 && (
              <span className=" absolute -top-1 -right-1 w-5 h-5 grid place-items-center bg-red-500 text-white text-xs font-medium rounded-full">
                {totalCartQuantity > 9 ? "9+" : totalCartQuantity}
              </span>
            )}
          </div>
        </Link>
        {isAuthenticated ? (
          <button
            onClick={() => setDropDown((prev) => !prev)}
            className="relative shadow flex items-center rounded-full focus:ring-4 focus:ring-gray-400"
          >
            <div className="flex-shrink-0 w-10 h-10 text-zinc-500 grid place-items-center rounded-full cursor-pointer hover:shadow-lg transition duration-200 ease">
              <i className="ri-account-circle-fill ri-lg"></i>
            </div>
            <p className="mr-4">{user?.fullname?.split(" ")[0] || "Account"}</p>

            {dropDown && (
              <Dropdown
                showDropdown={dropDown}
                setShowDropdown={setDropDown}
                className="absolute top-[110%] right-0 z-10 w-3xs max-w-sm bg-white shadow rounded-lg p-4"
              >
                <DropDownList />
              </Dropdown>
            )}
          </button>
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
