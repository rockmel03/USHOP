import React from "react";

export default function Modal({ showModal, hideModal, children }) {
  return (
    showModal && (
      <div
        onClick={hideModal}
        className="absolute top-0 left-0 z-50 w-full h-full grid place-items-center bg-zinc-500/50 backdrop-blur-sm"
      >
        <div onClick={(e) => e.stopPropagation()}>{children}</div>
      </div>
    )
  );
}
