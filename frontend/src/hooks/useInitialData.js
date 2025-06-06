import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategory } from "../features/category/categoryThunk";
import { getAllProducts } from "../features/product/productThunk";
import { getCartAsync } from "../features/cart/cartThunk";

const useInitialData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const a = dispatch(getAllProducts({}));
    const b = dispatch(getAllCategory({}));

    Promise.all([a, b])
      .then((responses) => {
        setIsLoading(false);
        responses.forEach((action) => {
          if (action.payload.error) {
            throw new Error(action.payload?.message || "Failed to load Data");
          }
        });
      })
      .catch((error) => {
        setIsLoading(false);
        setError(error.message);
      });

    return () => {
      a.abort();
      b.abort();
    };
  }, []);

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchCartPromise = dispatch(getCartAsync());

    return () => {
      fetchCartPromise.abort();
    };
  }, [isAuthenticated]);

  return [isLoading, error];
};

export default useInitialData;
