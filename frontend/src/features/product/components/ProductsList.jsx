import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProducts } from "../productThunk";
import ListItem from "./ListItem";
import DeleteProductModal from "./DeleteProductModal";

function ProductsList() {
  const { loading, value: products } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [requestQuery, setRequestQuery] = useState({ limit: 10, page: 1 });
  const [isAllFetched, setIsAllFetched] = useState(true);

  const fetchProducts = () => {
    const request = dispatch(getAllProducts(requestQuery));
    request.then((action) => {
      if (action.error) return;
      if (action.payload?.status) {
        const totalPages = action.payload?.data.totalPages;
        const currentPage = requestQuery.page;
        if (totalPages > currentPage) {
          setRequestQuery((prev) => ({ ...prev, page: prev.page + 1 }));
          setIsAllFetched(false);
        } else {
          setIsAllFetched(true);
        }
      }
    });
    return request;
  };

  useEffect(() => {
    if (products.length > 0) return;

    const request = fetchProducts();
    return () => {
      request?.abort();
    };
  }, []);

  return (
    <>
      <div className="p-5 bg-white rounded-md w-full h-full">
        <ul className="flex flex-col gap-1">
          <li className="px-4 py-3 rounded-md bg-zinc-100 ">
            <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1fr_1fr_0.5fr] items-center">
              <div className="flex items-center justify-start gap-1">
                {/* <img
                src="/landscape-placeholder.png"
                alt=""
                className="w-10 aspect-square object-contain bg-gray-100 rounded-md"
              /> */}
                <p className="text-sm font-semibold text-zinc-600 hover:text-zinc-800">
                  Product Name
                </p>
              </div>
              <p className="text-sm font-semibold text-zinc-600 hover:text-zinc-800">
                Category
              </p>
              <p className="text-sm font-semibold text-zinc-600 hover:text-zinc-800">
                Stock
              </p>
              <p className="text-sm font-semibold text-zinc-600 hover:text-zinc-800">
                Price
              </p>
              <p className="text-sm font-semibold text-zinc-600 hover:text-zinc-800">
                Status
              </p>
              <p className="text-sm font-semibold text-zinc-600 hover:text-zinc-800">
                Action
              </p>
            </div>
          </li>

          {products.map((product) => {
            return (
              <li
                key={product._id}
                className="px-4 py-3 rounded-md hover:bg-zinc-100 "
              >
                <ListItem data={product} />
              </li>
            );
          })}
          {!isAllFetched && (
            <button
              disabled={loading}
              onClick={fetchProducts}
              className="px-4 py-2 rounded text-gray-500 disabled:opacity-50"
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          )}
        </ul>
      </div>

      <DeleteProductModal />
    </>
  );
}

export default ProductsList;
