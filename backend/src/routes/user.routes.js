import { Router } from "express";
import {
  getAllUsers,
  getUserProfile,
  loginUser,
  logoutUser,
  refreshUser,
  registerUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/refresh").post(refreshUser);
router.route("/logout").get(logoutUser);
router.route("/profile").get(getUserProfile);
router.route("/").get(getAllUsers);

export default router;
