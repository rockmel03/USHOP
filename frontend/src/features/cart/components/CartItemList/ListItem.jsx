import { useDispatch } from "react-redux";
import {
  decreaseQuantity,
  increaseQuantity,
  removeFromCart,
  setQuantity,
} from "../../cartSlice";
import { Link } from "react-router-dom";

const ListItem = ({ data: { product, quantity } }) => {
  const dispatch = useDispatch();

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(product._id));
  };

  const handleIncreaseQuantity = () => {
    dispatch(increaseQuantity(product._id));
  };

  const handleDecreaseQuantity = () => {
    dispatch(decreaseQuantity(product._id));
  };

  const handleQuantityInputChange = (e) => {
    const newQuantity = Number(e.target.value);
    if (isNaN(newQuantity)) return;
    dispatch(
      setQuantity({
        productId: product._id,
        quantity: Number.parseInt(newQuantity),
      })
    );
  };

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
                onClick={handleDecreaseQuantity}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
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
                onChange={handleQuantityInputChange}
                value={quantity}
                required
              />
              <button
                type="button"
                id="increment-button"
                onClick={handleIncreaseQuantity}
                className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-100"
              >
                <span>
                  <i className="ri-add-line"></i>
                </span>
              </button>
            </div>
            <div className="text-end md:order-4 md:w-32">
              <p className="text-base font-bold text-gray-900">
                ${product.price}
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

              <button
                type="button"
                className="inline-flex items-center gap-1 text-sm font-medium text-red-600 hover:underline"
                onClick={handleRemoveFromCart}
              >
                <span>
                  <i className="ri-close-line ri-xl"></i>
                </span>
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default ListItem;
