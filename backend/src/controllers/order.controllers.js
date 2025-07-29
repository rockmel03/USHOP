import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import * as orderServices from "../services/order.services.js";
import { createPayment, verifyPayment } from "../services/payment.services.js";

// {
//   fullname: 'rockmel03',
//   phoneNumber: '1213456890',
//   paymentMethod: 'debit_card',
//   shippingAddress: {
//     address: 'House no 21, XYZ street\nLorem ipsum dolar, Abse',
//     city: 'Kashipur',
//     state: 'UT',
//     country: 'IN',
//     zipCode: '263639'
//   },
//   paymentInfo: {
//     razorpay_payment_id: 'pay_QyRZJYZb0mVP47',
//     razorpay_order_id: 'order_QyRYzuxokYa4b3',
//     razorpay_signature: '6bd159cfafa7ebfcf093e50318fc5fb0f05563465afa8953f628abe17c578a24'
//   }
// }

export const createOrder = asyncHandler(async (req, res) => {
  const { fullname, phoneNumber, shippingAddress, paymentMethod, paymentInfo } =
    req.body;

  const userId = req.user._id;

  // verify payment
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    paymentInfo;

  const paymentVerified = await verifyPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  });

  if (!paymentVerified) throw new ApiError(403, "Payment Failed");

  // create order
  const order = await orderServices.createOrder({
    userId,
    shippingAddress,
    fullname,
    phoneNumber,
  });

  // create payment
  const payment = await createPayment({
    orderId: order._id,
    userId,
    amount: order.totalAmount,
    paymentMethod,
    transactionId: razorpay_payment_id,
    status: paymentVerified ? "completed" : "failed",
  });

  order.payment = payment._id;
  await order.save();

  return res
    .status(201)
    .json(ApiResponse.success(order, "Order created successfully!", 201));
});

export const getOrderById = asyncHandler(async (req, res) => {
  const { orderId } = req.params;

  const order = await orderServices.getOrderById(orderId);

  if (!order) throw new ApiError(404, "Order not found");

  return res
    .status(200)
    .json(ApiResponse.success(order, "Order fetched successfully"));
});
