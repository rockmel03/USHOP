import { Router } from "express";
import { body, param, query } from "express-validator";
import Category from "../models/category.model.js";
import ApiError from "../utils/ApiError.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import upload, { handleMulterError } from "../middlewares/multer.middleware.js";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  updateProduct,
} from "../controllers/product.controllers.js";

const router = Router();

router
  .route("/")
  .get(
    [
      query("name").optional().isString(),
      query("category").optional().isString(),
      query("limit").default(10),
      query("page").default(1),
    ],
    getAllProducts
  )
  .post(
    authMiddleware(["seller", "admin"]),
    [
      // upload images - using multer for handling mutipart/form-data
      upload.array("images", 4),
      handleMulterError,
    ],
    [
      body("name")
        .isString()
        .isLength({ min: 5, max: 50 })
        .withMessage("name should be 5-50 charcters long"),
      body("description")
        .isString()
        .isLength({ min: 5, max: 255 })
        .withMessage("description should be 5-255 charcters long"),
      ,
      body("category").custom(async (input) => {
        const category = await Category.findById(input);
        if (!category) {
          throw ApiError.validationError("invalid category");
        }
        return true;
      }),
      body("price").isFloat({ min: 1 }),
      body("stock").isInt({ min: 1 }),
    ],
    addProduct
  );

router
  .route("/:productId")
  .get(
    [param("productId").isMongoId().withMessage("Invalid Product Id")],
    getProductById
  )
  .put(
    authMiddleware(["seller", "admin"]),
    [
      body("name")
        .isString()
        .isLength({ min: 5, max: 50 })
        .withMessage("name should be 5-50 charcters long"),
      body("description")
        .isString()
        .isLength({ min: 5, max: 255 })
        .withMessage("description should be 5-255 charcters long"),
      ,
      body("category").custom(async (input) => {
        const category = await Category.findById(input);
        if (!category) {
          throw ApiError.validationError("invalid category");
        }
        return true;
      }),
      body("price").isFloat({ min: 1 }),
      body("stock").isInt({ min: 1 }),
    ],
    updateProduct
  )
  .delete(
    authMiddleware(["seller", "admin"]),
    [param("productId").isMongoId().withMessage("Invalid Product Id")],
    deleteProduct
  );

export default router;
