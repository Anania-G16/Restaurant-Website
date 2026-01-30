import express from "express";
import dotenv from "dotenv";
import authRouter from "./src/routes/authRouter.js";
import menuRouter from "./src/routes/menuRouter.js";
import orderRouter from "./src/routes/orderRouter.js";
import adminOrderRouter from "./src/routes/adminOrderRouter.js";
import reservationRouter from "./src/routes/reservationRouter.js";
import adminReservationRouter from "./src/routes/adminReservationRouter.js";
import reviewRouter from "./src/routes/reviewRouter.js";
import contactRouter from "./src/routes/contactRouter.js";

dotenv.config();
const app = express();
app.use(express.json());

// Public/Auth routes
app.use("/auth", authRouter);
app.use("/menu", menuRouter);
app.use("/orders", orderRouter);
app.use("/reservations", reservationRouter);
app.use("/reviews", reviewRouter);
app.use("/contact", contactRouter);

// Admin routes
app.use("/admin/orders", adminOrderRouter);
app.use("/admin/reservations", adminReservationRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
