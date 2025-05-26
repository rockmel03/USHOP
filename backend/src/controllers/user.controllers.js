import asyncHandler from "../utils/asyncHandler.js";
import * as userServices from "../services/user.services.js";
import ApiResponse from "../utils/ApiResponse.js";

export const getUserProfile = asyncHandler(async (req, res) => {
  // todo : send full user profile
  return res
    .status(200)
    .json(ApiResponse.success(req.user, "Profile fetched successfully"));
});

export const getAllUsers = asyncHandler(async (req, res) => {
  const data = await userServices.getAllUsers(req.query);
  return res
    .status(200)
    .json(ApiResponse.success(data, "Users fetched successfully"));
});
