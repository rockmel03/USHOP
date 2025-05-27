import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import ProductsList from "../../../features/product/components/ProductsList";


function Products() {
  const { value: products } = useSelector((state) => state.products);

  return (
    <section className="relative px-4">
      <div className="min-h-screen">
        <div className="py-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Products List ({products.length})
          </h2>

          <Link
            to="/dashboard/products/add"
            className="px-4 py-2 text-sm font-medium text-white bg-violet-500 rounded-md"
          >
            <span>
              <i className="ri-add-line"></i>
            </span>
            <span> Add Product</span>
          </Link>
        </div>
        <ProductsList />
      </div>
    </section>
  );
}

export default Products;
