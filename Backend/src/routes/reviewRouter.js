import { authMiddleware } from "../middleware/auth.js";
import {
  submitReview,
  getReviewsForMenuItem,
} from "../controllers/reviewController.js";

export const routes = [
  { method: "POST", path: "/", handlers: [authMiddleware, submitReview] },
  { method: "GET", path: "/:menu_item_id", handlers: [getReviewsForMenuItem] },
];
