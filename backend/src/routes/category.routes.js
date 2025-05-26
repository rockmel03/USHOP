import { Router } from "express";
import { body, param } from "express-validator";
import authMiddleware from "../middlewares/auth.middleware.js";
import * as categoryControllers from "../controllers/category.controllers.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = Router();

router
  .route("/")
  .get(categoryControllers.getAllCategories)
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
    validateRequest,
    categoryControllers.createCategory
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
    validateRequest,
    categoryControllers.updateCategory
  )
  .delete(
    authMiddleware(["admin"]),
    [param("id").isMongoId().withMessage("Invalid id")],
    validateRequest,
    categoryControllers.deleteCategoryById
  );
export default router;
