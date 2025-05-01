import { Router } from "express";
import { body } from "express-validator";
import {
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
} from "../controllers/user.controllers.js";
import { USER_ROLES_ENUM } from "../constants.js";

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
  registerUser
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
    loginUser
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
    refreshUser
  );
router.route("/logout").get(logoutUser);
router.route("/profile").get(getUserProfile);
router.route("/").get(getAllUsers);

export default router;
