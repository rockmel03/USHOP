import { Router } from "express";
import { body } from "express-validator";
import * as cartController from "../controllers/cart.controllers.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import validateRequest from "../middlewares/validateRequest.js";

const router = Router();

// auth middleware
router.use(authMiddleware());

router.get("/", cartController.getCart);

router.post(
  "/",
  [
    body("productId").isMongoId().withMessage("Valid productId is required"),
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  validateRequest,
  cartController.addToCart
);

router.put(
  "/:itemId",
  [
    body("quantity")
      .isInt({ min: 1 })
      .withMessage("Quantity must be at least 1"),
  ],
  validateRequest,
  cartController.updateCartItem
);

router.delete("/:itemId", cartController.removeFromCart);

router.delete("/", cartController.clearCart);

module.exports = router;
