import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import * as CartServices from "../services/cart.services.js";

export const getCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cart = await CartServices.getCart(userId);
  res.json(ApiResponse.success(cart, "Get cart"));
});

export const addToCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  const cart = await CartServices.addToCart(userId, productId, quantity);
  res.json(ApiResponse.success(cart, "Add to cart"));
});

export const updateCartItem = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId, quantity } = req.body;
  const cart = await CartServices.updateCartItem(userId, productId, quantity);
  res.json(ApiResponse.success(cart, "Update cart item"));
});

export const removeFromCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const { productId } = req.body;
  const cart = await CartServices.removeFromCart(userId, productId);
  res.json(ApiResponse.success(cart, "Remove from cart"));
});

export const clearCart = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const cart = await CartServices.clearCart(userId);
  res.json(ApiResponse.success(cart, "Clear cart"));
});
