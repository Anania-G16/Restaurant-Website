import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";
import {
  getAllReservations,
  updateReservationStatus,
} from "../controllers/reservationController.js";

const router = express.Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get("/", getAllReservations); // View all reservations
router.patch("/:id/status", updateReservationStatus); // Update reservation status

export default router;
