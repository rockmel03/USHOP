import { Router } from "express";
import { body } from "express-validator";
import * as authControllers from "../controllers/auth.controllers.js";
import { USER_ROLES_ENUM } from "../constants.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = Router();

router.route("/register").post(
  [
    body("fullname").isString().notEmpty().withMessage("fullname is required"),
    body("email").isEmail().withMessage("email should be valid"),
    body("password")
      .isString()
      .isStrongPassword({
        minLength: 6,
        minSymbols: 1,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
      })
      .withMessage(
        "Password should be at least 6 characters long and include a mix of uppercase and lowercase letters, numbers, and special characters"
      ),
    body("role")
      .default("customer")
      .isString()
      .custom((input, meta) => {
        if (!USER_ROLES_ENUM.includes(input)) {
          throw Error("invalid role");
        }
        return true;
      }),
  ],
  validateRequest,
  authControllers.registerUser
);

router
  .route("/login")
  .post(
    [
      body("email").isEmail().withMessage("email should be valid"),
      body("password")
        .isString()
        .isLength({ min: 6 })
        .withMessage("Password should be at least 6 characters long"),
    ],
    validateRequest,
    authControllers.loginUser
  );

router
  .route("/refresh")
  .post(
    [
      body("refreshToken")
        .optional()
        .isJWT()
        .withMessage("Invalid refresh token"),
    ],
    validateRequest,
    authControllers.refreshUser
  );

router.route("/logout").get(authControllers.logoutUser);

export default router;
