import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as CartServices from "../services/cart.services.js";

export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cart = await CartServices.getCart(userId);
  res.json(ApiResponse.success(cart, "Cart fetched successfully"));
});

export const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  const cart = await CartServices.addToCart(userId, productId, quantity);
  res.json(ApiResponse.success(cart, "Added to cart"));
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { itemId: productId } = req.params;
  const { quantity } = req.body;
  const cart = await CartServices.updateCartItem(userId, productId, quantity);
  res.json(ApiResponse.success(cart, "Updated cart item"));
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { itemId: productId } = req.params;
  const cart = await CartServices.removeCartItem(userId, productId);
  res.json(ApiResponse.success(cart, "Removed from cart"));
});

export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cart = await CartServices.clearCart(userId);
  res.json(ApiResponse.success(cart, "Clear cart"));
});
