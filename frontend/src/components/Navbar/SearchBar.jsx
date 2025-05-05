import React from "react";

const SearchBar = () => {
  return (
    <div className="searchbar py-2 rounded-full shadow-lg w-full flex items-center">
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
  );
};

export default SearchBar;
