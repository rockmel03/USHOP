import Category from "../models/category.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { validationResult } from "express-validator";

export const createCategory = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());
  const { name, description, isActive } = req.body;

  const alreadyExists = await Category.findOne({ name });
  if (alreadyExists) throw new ApiError(400, "category already exists");

  const category = await Category.create({
    name,
    description,
    isActive,
  });
  if (!category) throw new ApiError(500, "Failed to create category");

  return res
    .status(201)
    .json(ApiResponse.success(category, "category created successfully", 201));
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { limit = 10, page = 1 } = req.query;
  const categories = await Category.aggregate([
    {
      $sort: {
        createdAt: -1,
      },
    },
    {
      $skip: Number(limit) * (Number(page) - 1),
    },
    {
      $limit: Number(limit),
    },
    {
      $project: {
        name: 1,
        description: 1,
        isActive: 1,
      },
    },
  ]);

  const totalDocuments = await Category.countDocuments();

  const dataToSend = {
    categories,
    limit: Number(limit),
    currentPage: Number(page),
    totalDocuments,
    totalPages: Math.ceil(totalDocuments / Number(limit)),
  };

  return res
    .status(200)
    .json(ApiResponse.success(dataToSend, "category fetched successfully"));
});

export const updateCategory = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { id } = req.params;
  const { name, description, isActive } = req.body;

  const category = await Category.findById(id);
  if (!category) throw new ApiError(400, "category not found");
  console.log(req.body);

  const updatedCategory = await Category.findByIdAndUpdate(
    id,
    {
      name,
      description,
      isActive,
    },
    { new: true }
  );
  if (!updatedCategory) throw new ApiError(500, "Failed to update category");

  return res
    .status(200)
    .json(
      ApiResponse.success(updatedCategory, "Category updated successfully!")
    );
});

export const deleteCategoryById = asyncHandler(async (req, res) => {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());

  const { id } = req.params;

  const category = await Category.findByIdAndDelete(id);
  if (!category)
    throw new ApiError(404, "category not found or already deleted");

  return res
    .status(200)
    .json(ApiResponse.success(category, "category deleted successfully"));
});
