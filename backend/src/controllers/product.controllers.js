import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const getAllProducts = asyncHandler(async (req, res) => {
  const { name, category, limit = 10, page = 1 } = req.query;

  const products = await Product.aggregate([
    {
      $match: {
        $or: [
          name ? { name: { $regex: name, $options: "i" } } : {},
          category ? { category } : {},
        ],
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $unwind: {
        path: "$category",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "seller",
        foreignField: "_id",
        as: "seller",
      },
    },
    {
      $unwind: {
        path: "$seller",
        preserveNullAndEmptyArrays: true,
      },
    },
    {
      $skip: Number(limit) * (Number(page) - 1),
    },
    {
      $limit: Number(limit),
    },
  ]);

  const totalProducts = await Product.countDocuments();

  return res.status(200).json(
    ApiResponse.success(
      {
        products,
        currentPage: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(totalProducts / Number(limit)),
        totalProducts,
      },
      "Products fetched successfully",
      200
    )
  );
});

export const getProductById = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) throw new ApiError(400, "Product ID is required");

  const product = await Product.findById(productId).populate([
    "category",
    "seller",
  ]);

  if (!product) throw new ApiError(404, "Product not found");

  return res
    .status(200)
    .json(ApiResponse.success(product, "Product fetched successfully"));
});

export const addProduct = asyncHandler(async (req, res) => {
  // validation
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  if (req.files?.length === 0) throw new ApiError(400, "images are required");
  const { name, description, price, category, stock } = req.body;

  const product = new Product({
    name,
    description,
    price: Number(price),
    images: [],
    category,
    stock: Number(stock),
    seller: req.user._id,
  });

  for (let i = 0; i < req.files.length; i++) {
    const uploadResult = await uploadOnCloudinary(req.files[i].path);
    if (uploadResult) {
      product.images.push({
        url: uploadResult.url,
        alt: product.name.replace(" ", "_") + "_" + i,
      });
    }
  }
  const savedProduct = await product.save();

  return res
    .status(201)
    .json(
      ApiResponse.success(savedProduct, "Product created successfully", 201)
    );
});

export const updateProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) throw new ApiError(400, "Product ID is required");

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  const isValidSeller =
    req.user?.role === "admin" || req.user?._id === product.seller.toString();
  if (!isValidSeller) {
    throw new ApiError(403, "You don't have permission to perform this action");
  }

  // Validate numeric fields if provided
  if (
    req.body.price &&
    (isNaN(req.body.price) || Number(req.body.price) <= 0)
  ) {
    throw new ApiError(400, "Price must be a positive number");
  }

  if (req.body.stock && (isNaN(req.body.stock) || Number(req.body.stock) < 0)) {
    throw new ApiError(400, "Stock cannot be negative");
  }

  // Handle image updates if files are provided
  if (req.files && req.files.length > 0) {
    req.body.images = req.files.map((file) => file.path);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { ...req.body },
    { new: true, runValidators: true }
  );

  return res
    .status(200)
    .json(ApiResponse.success(updatedProduct, "Product updated successfully"));
});

export const deleteProduct = asyncHandler(async (req, res) => {
  const { productId } = req.params;
  if (!productId) throw new ApiError(400, "Product ID is required");

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  const isValidSeller =
    req.user?.role === "admin" || req.user?._id === product.seller.toString();
  if (!isValidSeller) {
    throw new ApiError(403, "You don't have permission to perform this action");
  }

  const deletedProduct = await Product.findByIdAndDelete(productId);

  return res
    .status(200)
    .json(ApiResponse.success(deletedProduct, "Product deleted successfully"));
});
