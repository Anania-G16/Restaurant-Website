import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";
import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminOrderController.js";

export const routes = [
  {
    method: "GET",
    path: "/",
    handlers: [authMiddleware, adminMiddleware, getAllOrders],
  },
  {
    method: "PATCH",
    path: "/:id/status",
    handlers: [authMiddleware, adminMiddleware, updateOrderStatus],
  },
];
