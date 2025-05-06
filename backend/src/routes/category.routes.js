import { Router } from "express";
import { body, param } from "express-validator";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createCategory,
  deleteCategoryById,
  getAllCategories,
} from "../controllers/category.controllers.js";

const router = Router();

router
  .route("/")
  .get(getAllCategories)
  .post(
    authMiddleware(["admin"]),
    [
      body("name").isString().isLength({ min: 2, max: 10 }),
      body("description").optional().isString().isLength({ min: 4, max: 50 }),
      body("isActive").default(true).isBoolean(),
    ],
    createCategory
  );
router
  .route("/:catergoryId")
  .delete(
    authMiddleware(["admin"]),
    [param("catergoryId").isMongoId().withMessage("invalid Id")],
    deleteCategoryById
  );
export default router;
