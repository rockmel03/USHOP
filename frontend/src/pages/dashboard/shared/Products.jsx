import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ProductsList from "../../../features/product/components/ProductsList";
import AddProductForm from "../../../features/product/components/AddProductForm";

function Products() {
  const { value: products } = useSelector((state) => state.products);

  const [searchParams, setSearchParams] = useSearchParams();

  const [showAddProductForm, setShowAddProductFrom] = useState(false);

  useEffect(() => {
    setShowAddProductFrom(searchParams.get("add") ? true : false);
  }, [searchParams]);

  if (showAddProductForm)
    return (
      <div className="bg-white w-full">
        <button
          onClick={() => setSearchParams()}
          className="ml-4 p-2 rounded-full hover:shadow "
        >
          <span>
            <i className="ri-arrow-left-line ri-lg"></i>
          </span>
        </button>
        <div className="px-4">
          <AddProductForm />
        </div>
      </div>
    );

  return (
    <section className="relative px-4">
      <div className="min-h-screen">
        <div className="py-5 flex justify-between items-center">
          <h2 className="text-xl font-semibold">
            Products List ({products.length})
          </h2>

          <button
            onClick={() => setSearchParams({ add: true })}
            type="button"
            className="px-4 py-2 text-sm font-medium text-white bg-violet-500 rounded-md"
          >
            <span>
              <i className="ri-add-line"></i>
            </span>
            <span> Add Product</span>
          </button>
        </div>
        <ProductsList />
      </div>
    </section>
  );
}

export default Products;
