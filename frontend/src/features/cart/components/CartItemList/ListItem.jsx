import { useDispatch, useSelector } from "react-redux";
import { setQuantity } from "../../cartSlice";
import { Link } from "react-router-dom";
import { useCallback, useEffect, useRef, useState } from "react";
import RemoveFromCartButton from "../RemoveFromCartButton";
import { updateCartItemAsync } from "../../cartThunk";
import toast from "react-hot-toast";

const ListItem = ({ data: { product, quantity } }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [counter, setCounter] = useState(quantity || 0);

  const isIcrementDisabled = counter >= product.stock;
  const isDecrementDisabled = counter <= 1;

  const handleIncreaseQuantity = () => {
    setCounter((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setCounter((prev) => (prev <= 0 ? 0 : prev - 1));
  };

  const handleCounterInputChange = (e) => {
    const newQuantity = Number(e.target.value);

    if (isNaN(newQuantity)) return;
    if (newQuantity >= product.stock) return setQuantity(product.stock);

    setCounter(newQuantity > 0 ? Number.parseInt(newQuantity) : 0);
  };

  const saveQuantity = useCallback(
    ({ signal }) => {
      const data = {
        productId: product._id,
        quantity: counter,
      };

      if (isAuthenticated) {
        dispatch(updateCartItemAsync(data, { signal })).then((action) => {
          if (action.error)
            return action.payload && toast.error(action.payload);

          if (action.payload.status) {
            const toastId = "customIdForSucessToast";
            toast.dismiss(toastId); /// removed previous success toast to avoid multiple toast messages in ui
            toast.success("Update Success!", {
              id: toastId,
            });
          }
        });
      } else {
        dispatch(setQuantity(data));
      }
    },
    [counter, product._id, isAuthenticated]
  );

  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    let controller;
    const timeOut = setTimeout(() => {
      controller = new AbortController();
      saveQuantity({ signal: controller.signal });
    }, 1000);

    return () => {
      controller?.abort();
      clearTimeout(timeOut);
    };
  }, [saveQuantity]);

  return (
    product && (
      <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-smmd:p-6">
        <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
          <Link to={`/products/${product._id}`} className="shrink-0 md:order-1">
            <img
              className="h-20 w-20 object-cover"
              src={product?.images[0]?.url}
              alt={product?.images[0]?.alt}
            />
          </Link>

          <div className="flex items-center justify-between md:order-3 md:justify-end">
            <div className="flex items-center">
              <button
                type="button"
                id="decrement-button"
                disabled={isDecrementDisabled}
                onClick={handleDecreaseQuantity}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>
                  <i className="ri-subtract-line"></i>
                </span>
              </button>
              <input
                type="text"
                id="counter-input"
                className="w-10 shrink-0 border-0 bg-transparent text-center text-sm font-medium text-gray-900 focus:outline-none focus:ring-0"
                placeholder=""
                onChange={handleCounterInputChange}
                value={counter}
                required
              />
              <button
                type="button"
                id="increment-button"
                disabled={isIcrementDisabled}
                onClick={handleIncreaseQuantity}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100 cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
              >
                <span>
                  <i className="ri-add-line"></i>
                </span>
              </button>
            </div>
            <div className="text-end md:order-4 md:w-32">
              <p className="text-base font-bold text-gray-900">
                ₹{product.price}
              </p>
            </div>
          </div>

          <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-md">
            <Link
              to={`/products/${product._id}`}
              className="text-base font-medium text-gray-900 hover:underline"
            >
              {product.name}
            </Link>

            <div className="flex items-center gap-4">
              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-900 hover:underline"
              >
                <span>
                  <i className="ri-heart-line ri-lg"></i>
                </span>
                Add to Favorites
              </button>
              <RemoveFromCartButton productId={product._id}>
                {({ isLoading }) => (
                  <div className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline">
                    <span>
                      <i className="ri-close-line ri-xl"></i>
                    </span>
                    {isLoading ? "Removing..." : "Remove"}
                  </div>
                )}
              </RemoveFromCartButton>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ListItem;
