import { Router } from "express";
import handler from "express-async-handler";
import { auth } from "../middlewares/auth.mid.js";
import { BAD_REQUEST } from "../constants/httpStatus.js";
import Order from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";

const router = Router();
router.use(auth);

router.post("/create", handler(async (req, res) => {
    console.log("Received Order Data:", JSON.stringify(req.body, null, 2));

    const { order } = req.body;

    if (!order || !Array.isArray(order.items) || order.items.length === 0) {
        return res.status(BAD_REQUEST).json({
            error: true,
            message: "Invalid order: Items must be a non-empty array"
        });
    }

    if (!order.items.every(item => item.price)) {
        return res.status(BAD_REQUEST).json({
            error: true,
            message: "Each item must have a price"
        });
    }

    // Delete any existing NEW order for the user
    await Order.deleteOne({
        user: req.user.id,
        status: OrderStatus.NEW // Fixed Typo
    });

    // Create a new order
    const newOrder = new Order({
        ...order,
        user: req.user.id
    });

    await newOrder.save();

    res.status(201).json(newOrder);
}));

export default router;
