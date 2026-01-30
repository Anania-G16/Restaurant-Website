import { authMiddleware } from "../middleware/auth.js";
import {
  createReservation,
  getUserReservations,
} from "../controllers/reservationController.js";

export const routes = [
  { method: "POST", path: "/", handlers: [authMiddleware, createReservation] },
  { method: "GET", path: "/", handlers: [authMiddleware, getUserReservations] },
];
