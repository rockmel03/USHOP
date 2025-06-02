import React from "react";
import Spinner from "./Spinner";

const Loading = () => {
  return (
    <div className="relative w-full h-full min-h-[10vh]">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <Spinner />
      </div>
    </div>
  );
};

export default Loading;
