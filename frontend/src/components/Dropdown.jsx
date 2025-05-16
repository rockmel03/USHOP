import React, { useEffect, useRef } from "react";

function Dropdown({
  showDropdown,
  setShowDropdown,
  className,
  children,
  ...rest
}) {
  const dropDownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropDownRef.current && !dropDownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    const handleEscapeKey = (e) => {
      if (e.key === "Escape") {
        setShowDropdown(false);
      }
    };

    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscapeKey);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, [showDropdown]);

  return (
    showDropdown && (
      <div ref={dropDownRef} className={className} {...rest}>
        {children}
      </div>
    )
  );
}

export default Dropdown;
