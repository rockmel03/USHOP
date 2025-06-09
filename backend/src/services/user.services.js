import mongoose from "mongoose";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

export const getAllUsers = async ({ page = 1, limit = 10 } = {}) => {
  const currentPage = Number(page);
  const currentLimit = Number(limit);
  const skipDocuments = currentLimit * (currentPage - 1);

  const users = await User.find(
    {},
    {
      fullname: 1,
      email: 1,
      role: 1,
      isVerified: 1,
    }
  )
    .sort({ createdAt: -1 })
    .skip(skipDocuments)
    .limit(currentLimit);

  const totalDocuments = await User.countDocuments();

  return {
    totalPages: Math.ceil(totalDocuments / currentLimit),
    totalDocuments,
    currentLimit,
    currentPage,
    users,
  };
};

export const userProfile = async (userId) => {
  if (!userId) throw new ApiError(403, "Invalid UserId");

  const users = await User.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userId) } },
    {
      $project: {
        fullname: 1,
        email: 1,
        phoneNumber: 1,
        address: 1,
        role: 1,
        isVerified: 1,
      },
    },
  ]);

  if (users.length === 0) throw new ApiError(404, "User not found");

  return users[0];
};

export const addNewAddress = async (
  userId,
  { address, country, state, zipCode }
) => {
  if (!userId) throw new ApiError(403, "Invalid UserId");
  const user = User.findById(userId);
  if (!user) throw new ApiError(404, "user not found");

  user.address = {
    address,
    country,
    state,
    zipCode,
  };

  await user.save();
  const userData = await userProfile(userId);

  return userData;
};
