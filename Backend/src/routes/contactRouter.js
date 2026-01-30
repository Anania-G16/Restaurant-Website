import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";
import {
  submitMessage,
  getAllMessages,
} from "../controllers/contactController.js";

export const routes = [
  { method: "POST", path: "/", handlers: [authMiddleware, submitMessage] },
  {
    method: "GET",
    path: "/",
    handlers: [authMiddleware, adminMiddleware, getAllMessages],
  },
];
