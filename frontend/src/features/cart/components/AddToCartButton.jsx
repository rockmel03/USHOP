import { useDispatch } from "react-redux";
import { addToCart } from "../cartSlice";
import { useState } from "react";

const AddToCartButton = ({
  product,
  quantity = 1,
  children,
  className,
  ...rest
}) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
    setAdded(true);

    setTimeout(() => setAdded(false), 2000);
  };
  return (
    <button
      {...rest}
      disabled={added}
      onClick={handleAddToCart}
      className={`cursor-pointer disabled:cursor-default ${className}`}
    >
      {typeof children === "function" ? children(added) : children}
    </button>
  );
};

export default AddToCartButton;
