import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import foodRouter from "./routers/food.router.js";
import userRouter from "./routers/user.router.js";
import orderRouter from "./routers/order.router.js";
import { connectDB } from "./config/database.config.js";


const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

const PORT = process.env.PORT || 5000;

connectDB().then(app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
}))
