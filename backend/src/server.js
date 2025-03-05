import express from "express";
import cors from "cors";
import foodRouter from "./routers/food.router.js";



const app = express();
app.use(cors({
    origin: ["http://localhost:5173"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/foods", foodRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});