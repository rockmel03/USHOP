import React from "react";

export default function Success({ message }) {
  return (
    <div className="absolute top-0 left-0 w-full h-full flex flex-col gap-4 items-center justify-center bg-white">
      <p className="text-5xl  text-green-600">
        <i className="ri-checkbox-circle-line ri-xl"></i>
      </p>
      <h3 className="text-4xl font-medium  text-green-600">Success</h3>
      <p className="opacity-50 text-lg font-semibold">
        {message || " Task done successfully!"}
      </p>
    </div>
  );
}
