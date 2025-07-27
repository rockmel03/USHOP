import Razorpay from "razorpay";
import Payment from "../models/payment.model.js";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createRazorpayOrder = async ({ amount, currency = "INR" }) => {
  const options = {
    amount: amount * 100, // amount in paise
    currency,
    receipt: "receipt_order_" + Date.now(),
  };

  const order = await razorpay.orders.create(options);

  return order;
};

export const createPayment = async ({
  userId,
  orderId,
  amount,
  paymentMethod,
}) => {
  const payment = await Payment.create({
    order: orderId,
    user: userId,
    amount,
    paymentMethod,
  });

  return payment;
};

export const verifyPayment = async ({
  razorpay_order_id,
  razorpay_payment_id,
  razorpay_signature,
}) => {
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_SECRET)
    .update(sign.toString())
    .digest("hex");

  return expectedSignature === razorpay_signature;
};
