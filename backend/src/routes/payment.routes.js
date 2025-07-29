import { Router } from "express";
import { body } from "express-validator";
import validateRequest from "../middlewares/validateRequest.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  createPaymentOrder,
  verifyPayment,
} from "../controllers/payment.controllers.js";

const router = Router();

router.use(authMiddleware());

router
  .route("/create-order")
  .post(
    [
      body("amount").isNumeric(),
      body("currency").default("INR"),
      validateRequest,
    ],
    createPaymentOrder
  );

router
  .route("/verify")
  .post(
    [
      body("razorpay_order_id").isString(),
      body("razorpay_payment_id").isString(),
      body("razorpay_signature").isString(),
      validateRequest,
    ],
    verifyPayment
  );

export default router;
