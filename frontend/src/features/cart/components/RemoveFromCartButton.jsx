import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../cartSlice";
import { useState } from "react";
import toast from "react-hot-toast";
import { removeFromCartAsync } from "../cartThunk";

const RemoveFromCartButton = ({ productId, children, className, ...rest }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [state, setState] = useState({
    isRemoved: false,
    isLoading: false,
    error: "",
  });

  const handleRemoveFromCart = () => {
    setState((prev) => ({ ...prev, isLoading: true }));

    if (isAuthenticated) {
      dispatch(removeFromCartAsync({ productId })).then((action) => {
        if (action.error) {
          const errorMsg = action.payload || "Failed To Remove";
          setState((prev) => ({
            ...prev,
            isRemoved: false,
            isLoading: false,
            error: errorMsg,
          }));
          return toast.error(errorMsg);
        }
        if (action.payload.status) {
          setState((prev) => ({
            ...prev,
            isRemoved: true,
            isLoading: false,
          }));
        }
      });
    } else {
      dispatch(removeFromCart(productId));
      setState({ isRemoved: false, isLoading: false, error: "" });
    }
  };

  const isDisabled = state.isLoading || state.isRemoved;
  const cursorState = state.isLoading
    ? "cursor-progress"
    : state.isRemoved
    ? "cursor-not-allowed"
    : "cursor-pointer";

  return (
    productId && (
      <button
        {...rest}
        title={
          state.isRemoved
            ? "Already removed"
            : state.isLoading
            ? "Removing..."
            : ""
        }
        disabled={isDisabled}
        onClick={handleRemoveFromCart}
        className={`${cursorState} ${className}`}
      >
        {typeof children === "function" ? children(state) : children}
      </button>
    )
  );
};

export default RemoveFromCartButton;
