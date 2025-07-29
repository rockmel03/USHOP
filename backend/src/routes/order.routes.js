import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validateRequest from "../middlewares/validateRequest.js";
import { createOrder, getOrderById } from "../controllers/order.controllers.js";
import { body } from "express-validator";

const router = Router();

router.use(authMiddleware([]));

router.route("/").post(
  [
    body("shippingAddress")
      .isObject()
      .custom((input, meta) => {
        const requiredFields = [
          "address",
          "city",
          "state",
          "country",
          "zipCode",
        ];
        for (const field of requiredFields) {
          if (!input.hasOwnProperty(field)) {
            throw new Error(
              `shippingAddress is missing required field: ${field}`
            );
          }
        }
        return true;
      }),
    body("paymentMethod").isString().withMessage("paymentMethod is required"),
    body("paymentInfo")
      .isObject()
      .withMessage("paymentInfo is required")
      .custom((input, meta) => {
        const requiredFields = [
          "razorpay_payment_id",
          "razorpay_order_id",
          "razorpay_signature",
        ];
        for (const field of requiredFields) {
          if (!input.hasOwnProperty(field)) {
            throw new Error(`paymentInfo is missing required field: ${field}`);
          }
        }
        return true;
      }),
    validateRequest,
  ],
  createOrder
);


router.route("/:orderId").get(getOrderById);
export default router;
