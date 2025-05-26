import { validationResult } from "express-validator";
import ApiError from "../utils/ApiError.js";

export default function validateRequest(req, res, next) {
  const result = validationResult(req);
  if (!result.isEmpty()) throw ApiError.validationError(result.array());
  next();
}
