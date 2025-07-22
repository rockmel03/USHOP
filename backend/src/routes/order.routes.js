import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import validateRequest from "../middlewares/validateRequest.js";
import { createOrder } from "../controllers/order.controllers.js";
import { body } from "express-validator";

const router = Router();

router.use(authMiddleware([]));

router.route("/checkout").post(
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
    validateRequest,
  ],
  createOrder
);

export default router;
