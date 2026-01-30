import express from "express";
import { authMiddleware } from "../middleware/auth.js";
import {
  createReservation,
  getUserReservations,
} from "../controllers/reservationController.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createReservation); // Make a reservation
router.get("/", getUserReservations); // View user reservations

export default router;
