import mongoose from "mongoose";
import * as fsPromise from "node:fs/promises";
import Product from "../models/product.model.js";
import ApiError from "../utils/ApiError.js";
import {
  deleteFilesFromCloud,
  uploadFilesToCloud,
} from "../utils/fileUploader.js";

export const findAllProducts = async ({
  name,
  minPrice,
  maxPrice,
  category,
  page = 1,
  limit = 10,
  sortBy = "createdAt",
  sortOrder = "desc",
}) => {
  const currentLimit = Number(limit);
  const currentPage = Number(page);
  const skipDocuments = currentLimit * (currentPage - 1);

  const match = {};

  if (name !== undefined) match.name = { $regex: name, $options: "i" };

  if (minPrice !== undefined || maxPrice !== undefined) {
    match.price = {};
    if (minPrice !== undefined) match.price.$gte = Number(minPrice);
    if (maxPrice !== undefined) match.price.$lte = Number(maxPrice);
  }

  if (category && mongoose.isValidObjectId(category)) {
    match.category = new mongoose.Types.ObjectId(category);
  }

  const sort = {};
  sort[sortBy] = sortOrder === "asc" ? 1 : -1;

  const pipeline = [
    { $match: match },
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
        pipeline: [
          {
            $project: {
              fullname: 1,
              email: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: {
        path: "$seller",
        preserveNullAndEmptyArrays: true,
      },
    },
  ];

  if (category && !mongoose.isValidObjectId(category)) {
    pipeline.push({
      $match: {
        "category.name": { $regex: category, $options: "i" },
      },
    });
  }

  pipeline.push(
    { $sort: sort },
    { $skip: skipDocuments },
    { $limit: currentLimit }
  );

  const products = await Product.aggregate(pipeline);

  // count total Documents
  let totalDocuments;
  const countMatch = { ...match };
  if (category && !mongoose.isValidObjectId(category)) {
    // Need to count by joining with categories
    const totalDocumentsCount = await Product.aggregate([
      { $match: match },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category",
        },
      },
      { $unwind: "$category" },
      {
        $match: {
          "category.name": { $regex: category, $options: "i" },
        },
      },
      { $count: "count" },
    ]);

    totalDocuments = totalDocumentsCount[0]?.count || 0;
  } else {
    totalDocuments = await Product.countDocuments(countMatch);
  }

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

  const product = await Product.findById(productId)
    .populate("category")
    .populate("seller", ["fullname", "email"]);

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

  const uploadedImages = await uploadFilesToCloud(files, product.name);

  // Filter out any failed uploads
  const validImages = uploadedImages.filter((img) => img !== null);
  product.images.push(...validImages);

  await product.save();

  return product;
};

export const updateProduct = async (
  productId,
  { _id: userId, role },
  data,
  files
) => {
  if (!productId) throw new ApiError(400, "Product ID is required");

  // check product exists or not
  const product = await Product.findById(productId);
  if (!product) throw new ApiError(404, "Product not found");

  // check is valid user
  const isValidSeller =
    role === "admin" || userId === product.seller.toString();
  if (!isValidSeller) {
    throw new ApiError(403, "You don't have permission to perform this action");
  }

  const deleteImages = data?.deleteImages || [];

  // check total images must less then 4
  if (product.images.length - deleteImages.length + files.length > 4) {
    files.forEach((file) => {
      fsPromise.unlink(file.path);
    });
    throw new ApiError(409, "you can't updload files more than 4");
  }

  // delete images
  if (deleteImages.length > 0) {
    product.images = product.images.filter(
      (img) => !deleteImages.includes(img.url)
    );

    const deletedResult = await deleteFilesFromCloud(deleteImages);
    deletedResult.forEach((res) => {
      if (res.success) {
        console.log("File Deleted from cloud", res.url);
      } else {
        console.error("Failed to Delete from cloud", res.url);
      }
    });
  }

  // upload new images
  const uploadedImages = await uploadFilesToCloud(files, product.name);
  uploadedImages
    .filter((img) => img !== null)
    .forEach((img) => {
      product.images.push(img);
    });

  await product.save();

  // update other fields

  const allowedFields = [
    "name",
    "description",
    "price",
    "category",
    "stock",
    "price",
  ];

  const updateData = {};
  for (const field of allowedFields) {
    if (field in data) {
      updateData[field] = data[field];
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    productId,
    { ...updateData },
    { new: true, runValidators: true }
  )
    .populate("category")
    .populate("seller", ["fullname", "email"]);

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
  const deletedResult = await deleteFilesFromCloud(
    product.images.map((img) => img.url)
  );

  deletedResult.forEach((res) => {
    if (res.success) {
      console.log("File Deleted from cloud", res.url);
    } else {
      console.error("Failed to Delete from cloud", res.url);
    }
  });

  const deletedProduct = await Product.findByIdAndDelete(productId);

  return deletedProduct;
};
