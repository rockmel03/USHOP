import React from "react";
import OrderSummary from "../../cart/components/OrderSummary";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import useRazorPay from "../hooks/useRazorPay";
import { useSelector } from "react-redux";

const Payment = ({ orderId }) => {
  const navigate = useNavigate();

  if (!orderId) {
    toast.error("Order ID is required");
    navigate("/cart");
  }

  const { user } = useSelector((state) => state.auth);
  const checkout = useSelector((state) => state.checkout);

  const { payNow, isLoaded } = useRazorPay();

  const handlePayNow = () => {
    if (isLoaded) {
      payNow({
        amount: checkout.totalAmount,
        orderId,
        user: { ...user, contact: checkout.phoneNumber },
      });
    } else {
      toast.error("Razorpay is not loaded");
    }
  };

  console.dir(checkout);

  return (
    <div className="px-5 flex items-start justify-center gap-10">
      <OrderSummary />

      <button
        onClick={handlePayNow}
        className="bg-blue-500 text-white px-4 py-2 rounded-md font-semibold"
      >
        Pay Now
      </button>
    </div>
  );
};

export default Payment;
