import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

export default function authMiddleware(roles = []) {
  return async (req, res, next) => {
    try {
      const token = req.headers?.authorization?.replace("Bearer ", "");
      if (!token) {
        throw new ApiError(401, "Authentication token not found");
      }

      let decoded;
      try {
        decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      } catch (error) {
        throw new ApiError(401, "Invalid or expired authentication token");
      }

      if (!decoded?.user) {
        throw new ApiError(401, "Invalid token payload");
      }

      const hasValidRole =
        roles.length === 0 || roles.includes(decoded.user.role);
      if (!hasValidRole) {
        throw new ApiError(403, "Insufficient permissions");
      }

      req.user = decoded.user;
      next();
    } catch (error) {
      if (error instanceof ApiError) {
        return res
          .status(error.statusCode)
          .json(new ApiResponse(error.statusCode, null, error.message));
      }
      // Handle unexpected errors
      return res
        .status(500)
        .json(new ApiResponse(500, null, "Internal server error"));
    }
  };
}
