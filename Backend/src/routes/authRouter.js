import { register, login } from "../controllers/authController.js";

export const routes = [
  { method: "POST", path: "/register", handlers: [register] },
  { method: "POST", path: "/login", handlers: [login] },
];
