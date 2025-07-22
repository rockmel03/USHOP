import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import { verifyPayment } from "../controllers/payment.controllers.js";

const router = Router();

router.use(authMiddleware);

router.route("/verify", verifyPayment);

export default router;
