import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";
import {
  submitMessage,
  getAllMessages,
} from "../controllers/contactController.js";

const router = express.Router();

// Public or authenticated users can submit messages
router.post("/", authMiddleware, submitMessage);

// Admin routes
router.get("/", authMiddleware, adminMiddleware, getAllMessages);

export default router;
