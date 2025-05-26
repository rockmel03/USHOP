import { Router } from "express";
import { query } from "express-validator";
import * as userControllers from "../controllers/user.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/profile").get(authMiddleware(), userControllers.getUserProfile);
router
  .route("/")
  .get(
    authMiddleware(["admin"]),
    [
      query("page")
        .default(1)
        .isInt({ min: 1 })
        .withMessage("page should be an integer"),
      query("limit")
        .default(10)
        .isInt()
        .withMessage("limit should be an integer"),
    ],
    userControllers.getAllUsers
  );

export default router;
