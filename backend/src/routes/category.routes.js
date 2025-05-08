import { Router } from "express";
import { body, param } from "express-validator";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
  updateCategory,
} from "../controllers/category.controllers.js";

const router = Router();

router
  .route("/")
  .get(getAllCategories)
  .post(
    authMiddleware(["admin"]),
    [
      body("name")
        .isString()
        .isLength({ min: 2, max: 50 })
        .withMessage("name should 2-10 characters long"),
      body("description").optional().isString().isLength({ min: 4, max: 255 }),
      body("isActive").default(true).isBoolean(),
    ],
    createCategory
  );

router
  .route("/:id")
  .put(
    authMiddleware(["admin"]),
    [
      param("id").isMongoId().withMessage("Invalid id"),
      body("name")
        .optional()
        .isString()
        .isLength({ min: 2, max: 50 })
        .withMessage("name should 2-10 characters long"),
      body("description").optional().isString().isLength({ min: 4, max: 255 }),
      body("isActive").optional().default(true).isBoolean(),
    ],
    updateCategory
  )
  .delete(
    authMiddleware(["admin"]),
    [param("id").isMongoId().withMessage("Invalid id")],
    deleteCategoryById
  );
export default router;
