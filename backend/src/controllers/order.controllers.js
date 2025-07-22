import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import * as orderServices from "../services/order.services.js";

export const createOrder = asyncHandler(async (req, res) => {
  const { shippingAddress, paymentMethod } = req.body;
  const userId = req.user._id;

  const order = orderServices.createOrder({
    userId,
    shippingAddress,
    paymentMethod,
  });

  return res
    .status(201)
    .json(ApiResponse.success(order, "Order created successfully!", 201));
});
