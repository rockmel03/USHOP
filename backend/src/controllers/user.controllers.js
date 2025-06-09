import asyncHandler from "../utils/asyncHandler.js";
import * as userServices from "../services/user.services.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getAllUsers = asyncHandler(async (req, res) => {
  const data = await userServices.getAllUsers(req.query);
  return res
    .status(200)
    .json(ApiResponse.success(data, "Users fetched successfully"));
});

export const getUserProfile = asyncHandler(async (req, res) => {
  const data = await userServices.userProfile(req.user._id);
  return res
    .status(200)
    .json(ApiResponse.success(data, "Profile fetched successfully"));
});

export const addNewAddress = asyncHandler(async (req, res) => {
  const data = await userServices.addNewAddress(req.user._id, req.body);
  return res
    .status(200)
    .json(ApiResponse.success(data, "Address added successfully"));
});
