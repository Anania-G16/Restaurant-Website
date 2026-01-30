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

export const routes = [
  // Public
  { method: "GET", path: "/", handlers: [getMenuItems] },
  { method: "GET", path: "/categories", handlers: [getMenuCategories] },
  { method: "GET", path: "/:id", handlers: [getMenuItemById] },

  // Admin
  {
    method: "POST",
    path: "/",
    handlers: [authMiddleware, adminMiddleware, addMenuItem],
  },
  {
    method: "PATCH",
    path: "/:id",
    handlers: [authMiddleware, adminMiddleware, updateMenuItem],
  },
  {
    method: "DELETE",
    path: "/:id",
    handlers: [authMiddleware, adminMiddleware, deleteMenuItem],
  },

  {
    method: "POST",
    path: "/categories",
    handlers: [authMiddleware, adminMiddleware, addMenuCategory],
  },
  {
    method: "PATCH",
    path: "/categories/:id",
    handlers: [authMiddleware, adminMiddleware, updateMenuCategory],
  },
  {
    method: "DELETE",
    path: "/categories/:id",
    handlers: [authMiddleware, adminMiddleware, deleteMenuCategory],
  },
];
