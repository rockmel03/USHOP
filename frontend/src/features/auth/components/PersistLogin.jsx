import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { refreshAuthToken } from "../AuthThunk";
import useLocalStorage from "../../../hooks/useLocalStorage";

export default function PersistLogin() {
  const [isLoggedIn] = useLocalStorage("isLoggedIn", false);
  const [persist] = useLocalStorage("persist", false);

  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAuthenticated && isLoggedIn && persist) {
      dispatch(refreshAuthToken()).then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, isLoggedIn, persist]);

  return isLoading ? <p>loading...</p> : <Outlet />;
}
