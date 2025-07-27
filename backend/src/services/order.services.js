import Order from "../models/order.model.js";
import ApiError from "../utils/ApiError.js";
import { getCart } from "./cart.services.js";
import mongoose from "mongoose";
import { createPayment } from "./payment.services.js";

export const createOrder = async ({
  userId,
  shippingAddress,
  paymentMethod,
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
    });

    // create payment
    const payment = await createPayment({
      orderId: order._id,
      userId,
      amount: totalAmount,
      paymentMethod,
    });

    order.payment = payment._id;
    return await order.save();
 
};
