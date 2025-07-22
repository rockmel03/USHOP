import Razorpay from "razorpay";
import Payment from "../models/payment.model.js";
import ApiError from "../utils/ApiError.js";

const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

export const createPayment = async ({
  userId,
  orderId,
  amount,
  paymentMethod,
}) => {
  try {
    const payment = await Payment.create({
      order: orderId,
      user: userId,
      amount,
      paymentMethod,
    });

    return payment;
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "failed to create payment");
  }
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
