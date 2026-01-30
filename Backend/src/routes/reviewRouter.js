import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  submitReview,
  getReviewsForMenuItem,
} from "../controllers/reviewController.js";

const router = express.Router();

// Submit review (authenticated users)
router.post("/", authMiddleware, submitReview);

// Get reviews for a menu item (public)
router.get("/:menu_item_id", getReviewsForMenuItem);

export default router;
