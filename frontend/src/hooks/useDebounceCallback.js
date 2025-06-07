import { useRef } from "react";

const useDebounceCallback = (callback, timer) => {
  const debouceRef = useRef(null);

  return (...arg) => {
    clearTimeout(debouceRef.current);
    debouceRef.current = setTimeout(() => {
      callback(...arg);
    }, timer);
  };
};

export default useDebounceCallback;
