import { Router } from "express";
import handler from "express-async-handler";
import { auth } from "../middlewares/auth.mid.js";
import { BAD_REQUEST, NOT_FOUND } from "../constants/httpStatus.js";
import Order from "../models/order.model.js";
import { OrderStatus } from "../constants/orderStatus.js";
import Stripe from "stripe";

const router = Router();
router.use(auth);

router.post("/create", handler(async (req, res) => {
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

    res.status(201).json({ error: false, message: "Order created successfully" });
}));

router.get("/newOrderForCurrentUser", handler(async (req, res) => {
    const order = await getNewOrderForCurrentUser(req);

    if (order) {
        res.json(order);
    } else {
        res.status(NOT_FOUND).json({ error: true, message: "No new order found for the user" });
    }
}));

const getNewOrderForCurrentUser = handler(async (req) => {
    console.log("Fetching new order for user..." + req.user.id);

    const order = await Order.findOne({
        user: req.user.id,
        status: OrderStatus.NEW // Fixed Typo
    });

    // Return the found order
    return order;
});


router.post("/payment/create-checkout-session", handler(async (req, res) => {
    const { order } = req.body;
    console.log("Received Order Data:", JSON.stringify(req.body, null, 2));

    // Validation: Check for valid order
    if (!order || !Array.isArray(order.items) || order.items.length === 0) {
        return res.status(BAD_REQUEST).json({
            error: true,
            message: "Invalid order: Items must be a non-empty array"
        });
    }

    // Validation: Ensure each item has a price
    if (!order.items.every(item => item.price)) {
        return res.status(BAD_REQUEST).json({
            error: true,
            message: "Each item must have a price"
        });
    }

    // Ensure Stripe public key is available
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

    // Ensure Stripe secret key is available
    if (!stripeSecretKey) {
        console.error("Stripe secret key is missing.");
        return res.status(BAD_REQUEST).json({
            error: true,
            message: "Stripe secret key is missing."
        });
    }

    const stripe = new Stripe(stripeSecretKey);  // Initialize Stripe with the secret key

    try {
        const session = await stripe.checkout.sessions.create({
            line_items: order.items.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: {
                        name: item.name
                    },
                    unit_amount: Math.round(item.price * 100) // Convert to cents
                },
                quantity: item.quantity
            })),
            mode: "payment",
            success_url: "http://localhost:5173/success",
            cancel_url: "http://localhost:5173/cancel"
        });

        // Send the session ID to the frontend
        res.json({ error: false, sessionId: session.id });
    } catch (error) {
        console.error("Stripe session creation failed:", error);
        return res.status(BAD_REQUEST).json({
            error: true,
            message: "Failed to create Stripe checkout session"
        });
    }
}));

export default router;
