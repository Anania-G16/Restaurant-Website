import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";
import {
  getAllOrders,
  updateOrderStatus,
} from "../controllers/adminOrderController.js";

const router = express.Router();

// All routes protected by auth + admin
router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/", getAllOrders); // View all orders
router.patch("/:id/status", updateOrderStatus); // Update order status

export default router;
