import mongoose from "mongoose";
import { model, Schema } from "mongoose";
import { OrderStatus } from "../constants/orderStatus.js";
import Food from "./food.model.js"; // Import the Food model

export const orderItemSchema = new Schema(
    {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "Food", required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
        name: { type: String, required: true },
        image: { type: String, required: true }
    },
    { _id: false }
);

// Remove the incorrect "pre-validate" hook
orderItemSchema.pre("save", async function (next) {
    if (!this.price) {
        try {
            const foodItem = await Food.findById(this.productId);
            if (!foodItem) {
                return next(new Error("Food item not found"));
            }
            this.price = this.quantity * foodItem.price;
        } catch (error) {
            return next(error);
        }
    }
    next();
});

const orderSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        name: { type: String, required: true },
        address: { type: String, required: true },
        addressLatLng: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true }
        },
        paymentId: { type: String },
        totalPrice: { type: Number, required: true },
        totalCount: { type: Number, required: true },
        items: { type: [orderItemSchema], required: true },
        status: {
            type: String,
            enum: Object.values(OrderStatus),
            default: OrderStatus.NEW
        }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

const Order = model("Order", orderSchema);

export default Order;
