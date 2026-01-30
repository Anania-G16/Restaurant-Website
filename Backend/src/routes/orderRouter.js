import { authMiddleware } from "../middleware/auth.js";
import {
  getCart,
  addToCart,
  updateCartItem,
  checkoutOrder,
  getOrderHistory,
} from "../controllers/orderController.js";

export const routes = [
  { method: "GET", path: "/cart", handlers: [authMiddleware, getCart] },
  { method: "POST", path: "/cart", handlers: [authMiddleware, addToCart] },
  {
    method: "PATCH",
    path: "/cart/:itemId",
    handlers: [authMiddleware, updateCartItem],
  },
  {
    method: "POST",
    path: "/checkout",
    handlers: [authMiddleware, checkoutOrder],
  },
  { method: "GET", path: "/", handlers: [authMiddleware, getOrderHistory] },
];
