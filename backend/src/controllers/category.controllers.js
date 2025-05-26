import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import * as categoryServices from "../services/category.services.js";

export const createCategory = asyncHandler(async (req, res) => {
  const category = await categoryServices.addNewCategory(req.body);

  return res
    .status(201)
    .json(ApiResponse.success(category, "category created successfully", 201));
});

export const getAllCategories = asyncHandler(async (req, res) => {
  const dataToSend = await categoryServices.findAllCategories(req.query);

  return res
    .status(200)
    .json(ApiResponse.success(dataToSend, "categories fetched successfully"));
});

export const updateCategory = asyncHandler(async (req, res) => {
  const updatedCategory = await categoryServices.updateCategory(
    req.params.id,
    req.body
  );

  return res
    .status(200)
    .json(
      ApiResponse.success(updatedCategory, "Category updated successfully!")
    );
});

export const deleteCategoryById = asyncHandler(async (req, res) => {
  const category = await categoryServices.deleteCategory(req.params.id);

  return res
    .status(200)
    .json(ApiResponse.success(category, "category deleted successfully"));
});
