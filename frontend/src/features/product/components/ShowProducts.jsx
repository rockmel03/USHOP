import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductList from "./ProductList/ProductList";
import { getAllProducts } from "../productThunk";
import toast from "react-hot-toast";

const ShowProducts = () => {
  const { value: products, loading } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState({ page: 1, limit: 5, category: "all" });
  const [isAllFetched, setIsAllFetched] = useState(false);

  const fetchData = () => {
    const abortController = new AbortController();
    dispatch(getAllProducts(query, { signal: abortController.signal })).then(
      (action) => {
        if (action.error) return toast.error(action.payload);
        if (action.payload.status) {
          const { totalPages } = action.payload.data;
          if (!totalPages) return;
          if (totalPages > query.page) {
            setQuery((prev) => ({ ...prev, page: prev.page + 1 }));
            setIsAllFetched(false);
          } else if (totalPages === query.page) {
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
    if (products.length > 0) return;
    const abort = fetchData();
    return () => {
      abort();
    };
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    setQuery((prev) => ({ ...prev, category }));
  }, [searchParams]);

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
