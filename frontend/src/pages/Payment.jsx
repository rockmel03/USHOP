import React from "react";
import { useParams } from "react-router-dom";
import Payment from "../features/payment/components/Payment";

const PaymentPage = () => {
  const { orderId } = useParams();



  return (
    <section className="min-h-screen">
      <Payment orderId={orderId} />
    </section>
  );
};

export default PaymentPage;
