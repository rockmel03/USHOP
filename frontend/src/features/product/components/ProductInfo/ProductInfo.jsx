import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteProductModal from "../DeleteProductModal";

function ProductInfo() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);

  const { value: products } = useSelector((state) => state.products);
  const navigate = useNavigate();

  const handleDeleteClick = () => {
    navigate(`?action=delete&type=product&id=${productId}`);
  };

  useEffect(() => {
    const productData = products.find((item) => item._id === productId);
    console.log(productData);
    if (productData) return setProduct(productData);
  }, []);

  return (
    product && (
      <>
        <section className="min-h-screen">
          <div className="px-4 py-4">
            <h1 className="text-2xl text-center font-semibold">
              Product Details
            </h1>
          </div>
          <div className="px-4 py-2 w-full h-full flex flex-wrap md:flex-nowrap gap-6 ">
            <div className="flex-shrink-0">
              <img
                src={product.images[0]?.url}
                alt=""
                className="w-xs bg-blue-100 rounded-lg overflow-hidden object-contain"
              />
            </div>
            <div className="">
              <div className="max-w-lg">
                <h1 className="text-3xl font-bold"> {product.name}</h1>
                <p className="text-xl opacity-80 capitalize ">
                  {product.category.name}
                </p>
                <p className="text-yellow-500">
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-fill"></i>
                  <i class="ri-star-half-fill"></i>
                </p>
                <div className="flex items-end gap-2">
                  <div className="px-3 py-2 rounded bg-green-100 text-green-300 w-fit text-xs font-semibold">
                    50% off
                  </div>
                  <h3 className="text-xl font-bold ">
                    <span className="font-normal line-through opacity-50">
                      ₹{product.price + (product.price * 50) / product.price}
                    </span>{" "}
                    <span>₹{product.price}</span>
                  </h3>
                </div>
                <p className="mt-2 text-lg">
                  <span className="bg-red-900/50 text-white inline-block px-2 py-1 rounded text-sm font-semibold">
                    {product.stock}
                  </span>{" "}
                  pcs. left
                </p>
                <br />
                <p className="text-lg font-semibold">
                  {product.description} Lorem ipsum dolor sit amet consectetur
                  adipisicing elit. Minus, soluta!
                </p>
                <br />
                <div className="flex items-center gap-2">
                  <Link
                    to={`/dashboard/products/${productId}/edit`}
                    className="px-4 py-2 text-sm font-semibold rounded bg-blue-500 text-white cursor-pointer"
                  >
                    <span className="">Edit</span>
                  </Link>
                  <button
                    onClick={handleDeleteClick}
                    className="px-4 py-2 text-sm font-semibold rounded bg-red-500 text-white cursor-pointer"
                  >
                    <span className="">Delete</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>
        <DeleteProductModal
          onSuccessDelete={() => navigate("/dashboard/products")}
        />
      </>
    )
  );
}

export default ProductInfo;
