import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

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

export const createNewUser = async ({ fullname, email, password, role }) => {
  try {
    const user = await User.create({
      fullname,
      email,
      password,
      role,
    });

    const { accessToken, refreshToken } = await generateAccessRefreshTokens(
      user._id
    );

    return { accessToken, refreshToken, user };
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

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  if (!user) throw new ApiError(400, "invalid credentials");

  const isPwdMatched = await user.isValidPassword(password);
  if (!isPwdMatched) throw new ApiError(400, "invalid credentials");

  const { accessToken, refreshToken } = await generateAccessRefreshTokens(
    user._id
  );

  return { accessToken, refreshToken, user };
};

export const refreshAuthTokens = async (refreshToken) => {
  if (!refreshToken) throw new ApiError(400, "refresh token not found");
  let decoded;
  try {
    decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (error) {
    throw new ApiError(400, "invalid or expired refresh token");
  }
  const { accessToken, refreshToken: newRefreshToken } =
    await generateAccessRefreshTokens(decoded?.user?._id);

  return { accessToken, refreshToken: newRefreshToken };
};
