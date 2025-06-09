import { useSelector } from "react-redux";
import { selectCartTotalAmount, selectCartTotalQuantity } from "../cartSlice";

const OrderSummary = () => {
  const totalQuantity = useSelector(selectCartTotalQuantity);
  const totalAmount = useSelector(selectCartTotalAmount);

  const totalSaving = 0;
  const deliveryCharges = totalAmount > 500 ? 0 : 500;
  const tax = (totalAmount * 18) / 100;

  const netTotalAmount = totalAmount + deliveryCharges + tax - totalSaving;

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base font-normal text-gray-500">Total Items</dt>
          <dd className="text-base font-medium text-gray-900">
            {totalQuantity}
          </dd>
        </dl>
        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base font-normal text-gray-500">
            Original price
          </dt>
          <dd className="text-base font-medium text-gray-900">
            ₹{totalAmount.toFixed(2)}
          </dd>
        </dl>

        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base font-normal text-gray-500">Savings</dt>
          <dd className="text-base font-medium text-green-600">
            -₹{totalSaving.toFixed(2)}
          </dd>
        </dl>

        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base font-normal text-gray-500">Store Pickup</dt>
          <dd className="text-base font-medium text-gray-900">
            ₹{deliveryCharges.toFixed(2)}
          </dd>
        </dl>

        <dl className="flex items-center justify-between gap-4">
          <dt className="text-base font-normal text-gray-500">Tax</dt>
          <dd className="text-base font-medium text-gray-900">
            ₹{tax.toFixed(2)}
          </dd>
        </dl>
      </div>

      <dl className="flex items-center justify-between gap-4 border-t border-gray-200 pt-2">
        <dt className="text-base font-bold text-gray-900">Total</dt>
        <dd className="text-base font-bold text-gray-900">
          ₹{netTotalAmount.toFixed(2)}
        </dd>
      </dl>
    </div>
  );
};

export default OrderSummary;
