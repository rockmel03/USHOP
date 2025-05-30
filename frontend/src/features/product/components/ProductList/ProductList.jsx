import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../../productThunk";
import toast from "react-hot-toast";
import ProductCard from "./ProductCards/ProductCard";

const ProductList = () => {
  const { value: products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [query, setQuery] = useState({ page: 1, limit: 10, category: "all" });
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

  return (
    <section>
      {products.length > 0 && (
        <div className="w-full p-5 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((item) => {
            return <ProductCard key={item._id} data={item} />;
          })}
        </div>
      )}
    </section>
  );
};

export default ProductList;
