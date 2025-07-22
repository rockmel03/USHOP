import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
import asyncHandler from "../utils/asyncHandler.js";
import * as paymentServices from "../services/payment.services.js";

export const verifyPayment = asyncHandler(async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;

  const paymentVerified = await paymentServices.verifyPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (!paymentVerified) throw new ApiError(403, "Payment Failed");

  return res
    .status(200)
    .json(ApiResponse.success({ paymentVerified }, "Payment Success"));
});
