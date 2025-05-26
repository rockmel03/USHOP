import Category from "../models/category.model.js";
import ApiError from "../utils/ApiError.js";

export const addNewCategory = async ({ name, description, isActive }) => {
  try {
    const category = await Category.create({
      name,
      description,
      isActive,
    });
    if (!category) throw new ApiError(500, "Failed to create category");

    return category;
  } catch (error) {
    if (error.code === 11000) {
      // Check which field caused the duplicate error
      const field = Object.keys(error.keyPattern)[0];
      throw new ApiError(
        409,
        `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`
      );
    }
    throw error;
  }
};

export const findAllCategories = async ({ limit = 10, page = 1 }) => {
  const currentLimit = Number(limit);
  const currentPage = Number(page);
  const skipDocuments = currentLimit * (currentPage - 1);

  const categories = await Category.find(
    {},
    {
      name: 1,
      description: 1,
      isActive: 1,
    }
  )
    .sort({ createdAt: 1 })
    .skip(skipDocuments)
    .limit(currentLimit);

  const totalDocuments = await Category.countDocuments();

  return {
    totalPages: Math.ceil(totalDocuments / currentLimit),
    totalDocuments,
    currentLimit,
    currentPage,
    categories,
  };
};

export const updateCategory = async (id, { name, description, isActive }) => {
  const category = await Category.findById(id);
  if (!category) throw new ApiError(400, "category not found");

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

  return updatedCategory;
};

export const deleteCategory = async (id) => {
  const category = await Category.findByIdAndDelete(id);
  if (!category)
    throw new ApiError(404, "category not found or already deleted");

  return category;
};
