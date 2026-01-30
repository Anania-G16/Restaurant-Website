import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  checkoutOrder,
  getOrderHistory,
} from "../controllers/orderController.js";

const router = express.Router();

// All routes protected by authMiddleware
router.use(authMiddleware);

router.get("/cart", getCart); // View current cart
router.post("/cart", addToCart); // Add item to cart
router.patch("/cart/:itemId", updateCartItem); // Update or remove cart item
router.post("/checkout", checkoutOrder); // Place order
router.get("/", getOrderHistory); // View order history

export default router;
