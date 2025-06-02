import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import ProductList from "./ProductList/ProductList";
import { getAllProducts } from "../productThunk";
import toast from "react-hot-toast";
import { setFilters } from "../productSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../../components/Loading";

const ShowProducts = () => {
  const { value: products, filters } = useSelector((state) => state.products);
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();

  const [hasMore, setHasMore] = useState(true);

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
            setHasMore(true);
          } else if (totalPages <= currentPage) {
            setHasMore(false);
          }
        }
      }
    );

    return abortController;
  };

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      dispatch(setFilters({ category, page: 1 }));
    }
  }, [searchParams]);

  useEffect(() => {
    const contoller = fetchData();
    return () => {
      contoller.abort();
    };
  }, [filters.category]);

  return (
    <div>
      <InfiniteScroll
        dataLength={products.length} //This is important field to render the next data
        next={fetchData}
        hasMore={hasMore}
        loader={<Loading />}
        endMessage={
          <p className="text-center text-gray-500">
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        <ProductList data={products} />
      </InfiniteScroll>
    </div>
  );
};

export default ShowProducts;
