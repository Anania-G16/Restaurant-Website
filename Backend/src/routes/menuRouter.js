import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";
import {
  getMenuItems,
  getMenuItemById,
  getMenuCategories,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  addMenuCategory,
  updateMenuCategory,
  deleteMenuCategory,
} from "../controllers/menuController.js";

const router = express.Router();

// ------------------ PUBLIC ROUTES ------------------
router.get("/", getMenuItems);
router.get("/categories", getMenuCategories);
router.get("/:id", getMenuItemById);

// ------------------ ADMIN ROUTES ------------------
router.post("/", authMiddleware, adminMiddleware, addMenuItem);
router.patch("/:id", authMiddleware, adminMiddleware, updateMenuItem);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMenuItem);

router.post("/categories", authMiddleware, adminMiddleware, addMenuCategory);
router.patch(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  updateMenuCategory,
);
router.delete(
  "/categories/:id",
  authMiddleware,
  adminMiddleware,
  deleteMenuCategory,
);

export default router;
