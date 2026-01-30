import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";
import {
  getAllReservations,
  updateReservationStatus,
} from "../controllers/reservationController.js";

export const routes = [
  {
    method: "GET",
    path: "/",
    handlers: [authMiddleware, adminMiddleware, getAllReservations],
  },
  {
    method: "PATCH",
    path: "/:id/status",
    handlers: [authMiddleware, adminMiddleware, updateReservationStatus],
  },
];
