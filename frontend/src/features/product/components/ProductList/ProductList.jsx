import { useSelector } from "react-redux";
import ProductCard from "./ProductCards/ProductCard";

const ProductList = ({ data: products }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    products?.length > 0 && (
      <div className="w-full p-5 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
        {products.map((item) => {
          return (
            <ProductCard
              key={item._id}
              data={item}
              isAuthenticated={isAuthenticated}
            />
          );
        })}
      </div>
    )
  );
};

export default ProductList;
