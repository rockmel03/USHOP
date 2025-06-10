import { Router } from "express";
import { body, query } from "express-validator";
import * as userControllers from "../controllers/user.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = Router();

router.use(authMiddleware());

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
      validateRequest,
    ],
    userControllers.getAllUsers
  );

router.route("/me").get(userControllers.getUserProfile);
router
  .route("/address")
  .post(
    [
      body("address").isString().isLength({ min: 10, max: 255 }),
      body("country").isString(),
      body("state").isString(),
      body("city").isString(),
      body("zipCode"),
      validateRequest,
    ],
    userControllers.addNewAddress
  );

export default router;
