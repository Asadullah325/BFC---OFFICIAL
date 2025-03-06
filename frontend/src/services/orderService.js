import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const getAuthHeader = () => {
    const user = JSON.parse(localStorage.getItem("user")) || {};
    return user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

export const createOrder = async (orderData) => {
    try {
        const formattedOrder = {
            order: {
                ...orderData,
                items: orderData.items?.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    name: item.name,
                    image: item.image,
                    price: item.price ?? 0 // Ensure price is always present
                })) || []
            }
        };

        const { data } = await axios.post(`${API_BASE_URL}/orders/create`, formattedOrder, {
            headers: {
                ...getAuthHeader(),
                "Content-Type": "application/json"
            }
        });

        return data;
    } catch (error) {
        console.error("Order creation failed:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Order creation failed");
    }
};

export const getNewOrderForCurrentUser = async () => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/orders/newOrderForCurrentUser`, {
            headers: {
                ...getAuthHeader(),
                "Content-Type": "application/json"
            }
        });

        return data;
    } catch (error) {
        console.error("Fetching new order for user failed:", error?.response?.data || error.message);
        throw new Error(error?.response?.data?.message || "Fetching new order for user failed");
    }
};

export const stripePayment = async (order) => {
    try {
        console.log("Debug - Order object before sending:", JSON.stringify({ order }, null, 2)); // Debug log

        // Validate the order object
        if (!order || !Array.isArray(order.items) || order.items.length === 0) {
            console.error("Invalid order: Items must be a non-empty array", order);
            throw new Error("Invalid order: Items must be a non-empty array");
        }

        // Ensure each item has a price
        if (!order.items.every(item => item.price)) {
            throw new Error("Each item must have a price");
        }

        // Log the order for debugging purposes
        console.log("Order received:", order.items);

        // Ensure the Stripe public key is available
        const stripePublicKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
        if (!stripePublicKey) {
            throw new Error("Stripe publishable key is missing.");
        }

        // Initialize Stripe
        const stripe = await loadStripe(stripePublicKey);

        // Fetch request to create checkout session
        const user = JSON.parse(localStorage.getItem("user")) || {};
        const token = user.token ? `Bearer ${user.token}` : null;

        // Send the request to the API to create a checkout session
        const response = await fetch(`${API_BASE_URL}/orders/payment/create-checkout-session`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify({ order }), // Wrap the order object in a "order" property
        });

        if (!response.ok) {
            const text = await response.text();
            console.error("Server Error:", text);
            throw new Error(`Failed to create checkout session: ${response.status} - ${text}`);
        }

        const session = await response.json();

        // If session ID is invalid, throw error
        if (!session.sessionId) {
            throw new Error("Invalid session ID.");
        }

        // Redirect to Stripe Checkout
        await stripe.redirectToCheckout({ sessionId: session.sessionId });
    } catch (error) {
        console.error("Payment error:", error.message);
        alert(error.message || "Payment processing failed.");
        throw error;
    }
};