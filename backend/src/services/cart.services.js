import Cart from "../models/cart.model.js";
import ApiError from "../utils/ApiError.js";

export const addToCart = async (userId, productId, quantity) => {
  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [] });
  }
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex > -1) {
    cart.items[itemIndex].quantity += quantity;
  } else {
    cart.items.push({ product: productId, quantity });
  }
  await cart.save();
  return await Cart.findOne({ user: userId }).populate("items.product");
};

export const getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  return cart;
};

export const updateCartItem = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  const itemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );
  if (itemIndex === -1) {
    throw new ApiError(404, "Product not found in cart");
  }

  if (quantity === 0) cart.items.splice(itemIndex, 1);
  else cart.items[itemIndex].quantity = quantity;

  await cart.save();
  return await Cart.findOne({ user: userId }).populate("items.product");
};

export const removeCartItem = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId
  );
  await cart.save();
  return await Cart.findOne({ user: userId }).populate("items.product");
};

export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) {
    throw new ApiError(404, "Cart not found");
  }
  cart.items = [];
  await cart.save();
  return await Cart.findOne({ user: userId }).populate("items.product");
};
