import ApiResponse from "../utils/ApiResponse.js";
import { cookieOptions } from "../config/cookieOptions.js";
import * as authServices from "../services/auth.services.js";
import asyncHandler from "../utils/asyncHandler.js";

export const registerUser = asyncHandler(async (req, res) => {
  const { accessToken, refreshToken, user } = await authServices.createNewUser(
    req.body
  );

  return res
    .status(201)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        201,
        { user, accessToken, refreshToken },
        "user registered successfully"
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const { accessToken, refreshToken, user } = await authServices.loginUser({
    email,
    password,
  });

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "user logged in successfully"
      )
    );
});

export const refreshUser = asyncHandler(async (req, res) => {
  const token = req.cookies?.refreshToken || req.body?.refreshToken;
  const { accessToken, refreshToken } = await authServices.refreshAuthTokens(
    token
  );

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, cookieOptions)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "token refreshed successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  // todo: blacklist tokens

  return res
    .status(200)
    .clearCookie("refreshToken", cookieOptions)
    .json(new ApiResponse(200, null, "user logged out successfully"));
});
