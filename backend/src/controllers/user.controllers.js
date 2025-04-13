import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const generateAccessRefreshTokens = async (_id) => {
  try {
    const user = await User.findById(_id);
    if (!user) throw new Error("user not found");

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    if (!(accessToken && refreshToken)) {
      console.log(
        "accessToken : " + accessToken,
        "refreshToken : " + refreshToken
      );
      throw new Error("failed to generate access and refresh token");
    }

    return { accessToken, refreshToken };
  } catch (error) {
    console.error(error);
    throw new Error("failed to generate tokens");
  }
};

export const registerUser = asyncHandler(async (req, res) => {
  // validation
  // check existing user
  // create user
  // generate tokens
  // send response and set cookies

  const { email, password, role = "customer" } = req.body;
  if (!(email && password)) {
    throw new ApiError(400, "email & password required");
  }
  // todo: check email is valid and password must strong

  const existingUser = await User.findOne({ email, role });
  if (existingUser) throw new ApiError(400, "user already exists");

  const user = await User.create({
    email,
    password,
    role,
  });

  const { accessToken, refreshToken } = await generateAccessRefreshTokens(
    user._id
  );

  return res
    .status(201)
    .cookies("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 60 * 24,
    })
    .json(
      new ApiResponse(
        201,
        { user, accessToken, refreshToken },
        "user registered successfully"
      )
    );
});

export const loginUser = asyncHandler(async (req, res) => {
  // validation
  // check user exists
  // match password
  // generate tokens
  // send response and set cookies

  const { email, password } = req.body;
  if (!(email && password)) {
    throw new ApiError(400, "email & password required");
  }
  // todo: check email is valid

  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(400, "invalid credentials");

  const isPwdMatched = await user.isValidPassword(password);
  if (!isPwdMatched) throw new ApiError(400, "invalid credentials");

  const { accessToken, refreshToken } = await generateAccessRefreshTokens(
    user._id
  );

  return res
    .status(200)
    .cookies("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 60 * 24,
    })
    .json(
      new ApiResponse(
        200,
        { user, accessToken, refreshToken },
        "user logged in successfully"
      )
    );
});

export const refreshUser = asyncHandler(async (req, res) => {
  // get refresh token and validate
  // verify jwt
  // generate tokens
  // send response and set cookie

  const token = req.cookie?.refreshToken || req.body.refreshToken;
  if (!token) throw new ApiError(400, "invalid refresh token");

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(400, "invalid or expired refresh token");
  }
  const { accessToken, refreshToken } = await generateAccessRefreshTokens(
    decoded?.user?._id
  );

  return res
    .status(200)
    .cookies("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 60 * 24,
    })
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "token refreshed successfully"
      )
    );
});

export const logoutUser = asyncHandler(async (req, res) => {
  // clear cookies
  // todo: blacklist tokens

  return res(200)
    .clearCookie("refreshToken", {
      httpOnly: true,
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 60 * 24,
    })
    .json(new ApiResponse(200, null, "user logged out successfully"));
});

export const getUserProfile = asyncHandler(async (req, res) => {});
export const getAllUsers = asyncHandler(async (req, res) => {});
