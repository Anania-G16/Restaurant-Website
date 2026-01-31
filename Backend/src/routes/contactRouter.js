import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";
import {
  submitMessage,
  getAllMessages,
  deleteMessage,
} from "../controllers/contactController.js";

export const routes = [
  { method: "POST", path: "/", handlers: [authMiddleware, submitMessage] },
  {
    method: "GET",
    path: "/",
    handlers: [authMiddleware, adminMiddleware, getAllMessages],
  },
  {
    method: "DELETE",
    path: "/:id",
    handlers: [authMiddleware, adminMiddleware, deleteMessage],
  },
];
