import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductList from "./ProductList/ProductList";
import { getAllProducts } from "../productThunk";
import toast from "react-hot-toast";
import { setFilters } from "../productSlice";

const ShowProducts = () => {
  const {
    value: products,
    loading,
    filters,
  } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [isAllFetched, setIsAllFetched] = useState(false);

  const fetchData = () => {
    const abortController = new AbortController();
    dispatch(getAllProducts(filters, { signal: abortController.signal })).then(
      (action) => {
        if (action.error) return action.payload && toast.error(action.payload);
        if (action.payload.status) {
          const { totalPages, currentPage } = action.payload.data;
          if (!totalPages || !currentPage) return;
          if (totalPages > currentPage) {
            dispatch(setFilters({ page: currentPage + 1 }));
            setIsAllFetched(false);
          } else if (totalPages <= currentPage) {
            setIsAllFetched(true);
          }
        }
      }
    );

    return function abort() {
      abortController.abort();
    };
  };

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      dispatch(setFilters({ category, page: 1 }));
    }
  }, [searchParams]);

  useEffect(() => {
    const abort = fetchData();
    return () => {
      abort();
    };
  }, [filters.category]);

  return (
    <div>
      <ProductList data={products} />
      <div className="w-full text-center">
        {!isAllFetched && (
          <button
            type="button"
            disabled={loading}
            onClick={() => fetchData()}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 "
          >
            {loading ? "Loading..." : "Show more"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ShowProducts;
