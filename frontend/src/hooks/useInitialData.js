import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllCategory } from "../features/category/categoryThunk";
import { getAllProducts } from "../features/product/productThunk";

const useInitialData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

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

  return [isLoading, error];
};

export default useInitialData;
