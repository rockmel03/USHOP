import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../cartSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { addToCartAsync } from "../cartThunk";

const AddToCartButton = ({
  product,
  quantity = 1,
  children,
  className,
  ...rest
}) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isAdded: false,
    isLoading: false,
    error: "",
  });

  const handleAddToCart = () => {
    setState((prev) => ({ ...prev, isLoading: true }));
    dispatch(addToCart({ product, quantity }));

    if (isAuthenticated) {
      dispatch(addToCartAsync({ productId: product._id, quantity })).then(
        (action) => {
          if (action.error) {
            const errorMsg = action.payload || "Add to Cart Failed";
            setState((prev) => ({
              ...prev,
              isAdded: false,
              isLoading: false,
              error: errorMsg,
            }));
            return toast.error(errorMsg);
          }
          if (action.payload.status) {
            setState((prev) => ({ ...prev, isAdded: true, isLoading: false }));
          }
        }
      );
    } else {
      setState((prev) => ({ ...prev, isAdded: true, isLoading: false }));
      setTimeout(
        () => setState({ isAdded: false, isLoading: false, error: "" }),
        2000
      );
    }
  };

  const isDisabled = state.isLoading || state.isAdded;
  const cursorState = state.isLoading
    ? "cursor-progress"
    : state.isAdded
    ? "cursor-not-allowed"
    : "cursor-pointer";

  return (
    product?._id && (
      <button
        {...rest}
        title={
          state.isAdded ? "Already added" : state.isLoading ? "Adding..." : ""
        }
        disabled={isDisabled}
        onClick={handleAddToCart}
        className={`${cursorState} ${className}`}
      >
        {typeof children === "function" ? children(state) : children}
      </button>
    )
  );
};

export default AddToCartButton;
