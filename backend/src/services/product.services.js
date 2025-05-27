import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const findAllProducts = async ({
  name,
  category,
  limit = 10,
  page = 1,
}) => {
  const currentLimit = Number(limit);
  const currentPage = Number(page);
  const skipDocuments = currentLimit * (currentPage - 1);

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
      $skip: skipDocuments,
    },
    {
      $limit: currentLimit,
    },
  ]);

  const totalDocuments = await Product.countDocuments();
  return {
    totalPages: Math.ceil(totalDocuments / currentLimit),
    totalDocuments,
    currentPage,
    currentLimit,
    products,
  };
};

export const findProductById = async (productId) => {
  if (!productId) throw new ApiError(400, "Product ID is required");

  const product = await Product.findById(productId).populate([
    "category",
    "seller",
  ]);

  if (!product) throw new ApiError(404, "Product not found");
  return product;
};

export const createNewProduct = async (
  { name, description, price, category, stock },
  files,
  { _id: userId }
) => {
  if (files?.length === 0) throw new ApiError(400, "images are required");

  const product = new Product({
    name,
    description,
    price: Number(price),
    images: [],
    category,
    stock: Number(stock),
    seller: userId,
  });

  for (let i = 0; i < files.length; i++) {
    const uploadResult = await uploadOnCloudinary(files[i].path);
    if (uploadResult) {
      product.images.push({
        url: uploadResult.url,
        alt: product.name.replace(" ", "_") + "_" + i,
      });
    }
  }

  const savedProduct = await product.save();
  return savedProduct;
};

export const updateProduct = async (
  productId,
  { _id: userId, role },
  data,
  files
) => {
  if (!productId) throw new ApiError(400, "Product ID is required");

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  const isValidSeller =
    role === "admin" || userId === product.seller.toString();
  if (!isValidSeller) {
    throw new ApiError(403, "You don't have permission to perform this action");
  }

  // Handle image updates if files are provided
  if (files && files.length > 0) {
    data.images = files.map((file) => file.path);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { ...data },
    { new: true, runValidators: true }
  );

  return updatedProduct;
};

export const deleteProduct = async (productId, { _id: userId, role }) => {
  if (!productId) throw new ApiError(400, "Product ID is required");

  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  const isValidSeller =
    role === "admin" || userId === product.seller.toString();
  if (!isValidSeller) {
    throw new ApiError(403, "You don't have permission to perform this action");
  }

  const deletedProduct = await Product.findByIdAndDelete(productId);

  return deletedProduct;
};
