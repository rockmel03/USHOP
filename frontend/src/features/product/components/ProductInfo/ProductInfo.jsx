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

  if (!product) return;

  return (
    <section className="py-8 bg-white md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full object-cover rounded"
              src={product.images[0]?.url}
              alt=""
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {product.name}
            </h1>

            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <div className="px-3 py-2 rounded bg-green-100 text-green-300 w-fit text-xs font-semibold">
                15% off
              </div>

              <p className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                <span className="font-normal line-through opacity-50">
                  ₹{product.price + (product.price * 15) / product.price}
                </span>{" "}
                <span>₹{product.price}</span>
              </p>
            </div>

            <div className="mt-4 sm:items-center sm:gap-4 sm:flex">
              <div className="flex items-center gap-2 mt-2 sm:mt-0">
                <div className="flex items-center gap-1 text-yellow-500">
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-fill"></i>
                  <i className="ri-star-half-fill"></i>
                </div>
                <p className="text-sm font-medium leading-none text-gray-500">
                  (4.9)
                </p>
                <a
                  href="#"
                  className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline"
                >
                  345 Reviews
                </a>
              </div>
            </div>
            <p className="mt-2 text-xl opacity-80 capitalize ">
              {product.category.name}
            </p>

            {isAuthenticated && (isAdmin || isSeller) ? (
              <>
                <p className="mt-2 text-lg">
                  <span className="bg-red-900/50 text-white inline-block px-2 py-1 rounded text-sm font-semibold">
                    {product.stock}
                  </span>{" "}
                  pcs. left
                </p>
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <Link to={`/dashboard/products/${productId}/edit`}>
                    <div className="text-white mt-4 sm:mt-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center">
                      <span className="mr-1">
                        <i className="ri-edit-line ri-lg"></i>
                      </span>
                      <span className="">Edit</span>
                    </div>
                  </Link>
                  <button
                    onClick={handleDeleteClick}
                    className="text-white mt-4 sm:mt-0 bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center"
                  >
                    <span className="mr-1">
                      <i className="ri-delete-bin-line ri-lg"></i>
                    </span>
                    <span className="">Delete</span>
                  </button>
                </div>
                <DeleteProductModal
                  onSuccessDelete={() => navigate("/dashboard/products")}
                />
              </>
            ) : (
              <>
                <div className="mt-2 text-lg">
                  {product.stock > 10 ? (
                    <span className="bg-green-900/50 text-white inline-block px-2 py-1 rounded text-sm font-semibold">
                      Available
                    </span>
                  ) : product.stock < 10 && product !== 0 ? (
                    <span className="bg-red-900/50 text-white inline-block px-2 py-1 rounded text-sm font-semibold">
                      Only {product.stock} Pcs. left
                    </span>
                  ) : (
                    <span className="bg-red-900/50 text-white inline-block px-2 py-1 rounded text-sm font-semibold">
                      Out of Stock
                    </span>
                  )}
                </div>
                <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                  <a
                    href="#"
                    title=""
                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                    role="button"
                  >
                    <span className="mr-1">
                      <i className="ri-heart-line ri-lg"></i>
                    </span>
                    Add to favorites
                  </a>
                  {product.stock > 0 && (
                    <AddToCartButton
                      product={product}
                      isAuthenticated={isAuthenticated}
                    >
                      {({ isAdded, isLoading }) => (
                        <div
                          className={`text-white mt-4 sm:mt-0 font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none flex items-center justify-center ${
                            isAdded
                              ? "bg-green-700 hover:bg-green-800 focus:ring-4 focus:green-blue-300"
                              : "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300"
                          }`}
                        >
                          <span className="mr-1">
                            {isAdded ? (
                              <i className="ri-checkbox-circle-fill ri-lg"></i>
                            ) : (
                              <i className="ri-shopping-cart-2-line ri-lg"></i>
                            )}
                          </span>
                          {isLoading
                            ? "Adding..."
                            : isAdded
                            ? "Added to cart"
                            : "Add to cart"}
                        </div>
                      )}
                    </AddToCartButton>
                  )}
                </div>
              </>
            )}
            <hr className="my-6 md:my-8 border-gray-200" />

            <p className="mb-6 text-gray-500">{product.description}</p>

            <p className="text-gray-500">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Odit hic
              totam voluptas tempora tempore, unde rem, illum eligendi soluta
              repellat veniam deserunt facilis voluptatem culpa molestiae
              minima, fugiat ut quae.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductInfo;
