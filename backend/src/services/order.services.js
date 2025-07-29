import Order from "../models/order.model.js";
import ApiError from "../utils/ApiError.js";
import { getCart } from "./cart.services.js";
import mongoose from "mongoose";

export const createOrder = async ({
  userId,
  shippingAddress,
  fullname,
  phoneNumber,
}) => {
  if (!mongoose.isValidObjectId(userId)) throw new Error("Invalid userId");

  // get cart
  const cart = await getCart(userId);
  if (!cart) throw new ApiError(403, "Cart not found");
  if (cart.items.length === 0) throw new ApiError(403, "no items found ");

  const items = cart.items.map((item) => {
    return {
      product: item.product._id,
      quantity: item.quantity,
      price: Number(item.product.price),
    };
  });

  const totalAmount = items.reduce((acc, curr) => (acc += curr.price), 0);

  // create order
  const order = new Order({
    user: userId,
    items,
    totalAmount,
    shippingAddress,
    fullname,
    phoneNumber,
  });

  return await order.save();
};

export const getOrderById = async (orderId) => {
  if (!mongoose.isValidObjectId(orderId)) throw new Error("Invalid orderId");

  const order = await Order.findById(orderId).populate("user");

  if (!order) throw new ApiError(404, "Order not found");

  return order;
};
