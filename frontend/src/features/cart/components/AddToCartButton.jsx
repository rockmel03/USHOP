import { useDispatch } from "react-redux";
import { addToCart } from "../cartSlice";

const AddToCartButton = ({ product, quantity = 1, children, ...rest }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart({ product, quantity }));
  };
  return (
    <button onClick={handleAddToCart} {...rest}>
      {children}
    </button>
  );
};

export default AddToCartButton;
