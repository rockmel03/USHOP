import { useSelector } from "react-redux";
import ListItem from "./ListItem";

export const CartItemList = () => {
  const { items: cartItems } = useSelector((state) => state.cart);
  return (
    cartItems?.length > 0 && (
      <div className="space-y-6">
        {cartItems.map((item) => {
          return <ListItem data={item} />;
        })}
      </div>
    )
  );
};
