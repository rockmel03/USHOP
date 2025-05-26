import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

import * as productServices from "../services/product.services.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const productsData = await productServices.findAllProducts(req.query);

  return res
    .status(200)
    .json(
      ApiResponse.success(productsData, "Products fetched successfully", 200)
    );
});

export const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const product = await productServices.findProductById(productId);

  return res
    .status(200)
    .json(ApiResponse.success(product, "Product fetched successfully"));
});

export const addProduct = asyncHandler(async (req, res) => {
  const savedProduct = await productServices.createNewProduct(
    req.body,
    req.files
  );

  return res
    .status(201)
    .json(
      ApiResponse.success(savedProduct, "Product created successfully", 201)
    );
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  

  return res
    .status(200)
    .json(ApiResponse.success(updatedProduct, "Product updated successfully"));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  const user = req.user;

  const deletedProduct = await productServices.deleteProduct(productId, user);
  return res
    .status(200)
    .json(ApiResponse.success(deletedProduct, "Product deleted successfully"));
});
