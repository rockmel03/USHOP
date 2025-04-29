import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <section classname="bg-gray-900 text-white w-full h-screen grid place-items-center">
      <div classname="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div classname="mx-auto max-w-screen-sm text-center">
          <h1 classname="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-blue-700">
            404
          </h1>
          <p classname="mb-4 text-3xl tracking-tight font-bold md:text-4xl ">
            Something's missing.
          </p>
          <p classname="mb-4 text-lg font-light text-gray-400 ">
            Sorry, we can't find that page. You'll find lots to explore on the
            home page.
          </p>
          <div className="flex items-center justify-center gap-2">
            <Link
              to={-1}
              replace
              classname="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
            >
              Go Back
            </Link>
            <Link
              to="/"
              replace
              classname="inline-flex text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-primary-900 my-4"
            >
              Back to Homepage
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotFound;
