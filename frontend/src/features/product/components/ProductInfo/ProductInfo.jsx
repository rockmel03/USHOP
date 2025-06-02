import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import DeleteProductModal from "../DeleteProductModal";
import { getProductById } from "../../productThunk";
import AddToCartButton from "../../../cart/components/AddToCartButton";

function ProductInfo() {
  const { id: productId } = useParams();
  const [product, setProduct] = useState(null);

  const { value: products } = useSelector((state) => state.products);
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const isAdmin = user?.role === "admin";
  const userId = user?._id;
  const sellerId = product?.seller
    ? typeof product.seller === "string"
      ? product.seller
      : typeof product.seller === "object"
      ? product.seller._id
      : null
    : null;
  const isSeller = userId && sellerId && userId === sellerId;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDeleteClick = () => {
    navigate(`?action=delete&type=product&id=${productId}`);
  };

  useEffect(() => {
    const productData = products.find((item) => item._id === productId);
    if (productData) return setProduct(productData);

    const abortController = new AbortController();
    dispatch(
      getProductById(productId, { signal: abortController.signal })
    ).then((action) => {
      if (action.error) return;
      if (action.payload.status) {
        setProduct(action.payload.data);
      }
    });
    return () => {
      abortController.abort();
    };
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
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-half-fill"></i>
                </p>
                <div className="flex items-end gap-2">
                  <div className="px-3 py-2 rounded bg-green-100 text-green-300 w-fit text-xs font-semibold">
                    15% off
                  </div>
                  <h3 className="text-xl font-bold ">
                    <span className="font-normal line-through opacity-50">
                      ₹{product.price + (product.price * 15) / product.price}
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

                {isAuthenticated && (isAdmin || isSeller) ? (
                  <>
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
                    <DeleteProductModal
                      onSuccessDelete={() => navigate("/dashboard/products")}
                    />
                  </>
                ) : (
                  <AddToCartButton product={product}>
                    <div className="inline-flex items-center rounded-lg bg-yellow-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-yellow-800 focus:outline-none focus:ring-4  focus:ring-yellow-300">
                      <span className="mr-1">
                        <i className="ri-shopping-cart-2-line ri-lg"></i>
                      </span>
                      Add to cart
                    </div>
                  </AddToCartButton>
                )}
              </div>
            </div>
          </div>
        </section>
      </>
    )
  );
}

export default ProductInfo;
