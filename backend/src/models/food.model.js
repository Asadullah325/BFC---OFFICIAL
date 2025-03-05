import { model, Schema } from "mongoose";

const foodSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    cookTime: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    favourite: {
        type: Boolean,
        default: false
    },
    origins: {
        type: [String],
        required: true
    },
    stars: {
        type: Number,
        default: 3
    },
    image: {
        type: String,
        required: true
    },
    tags: {
        type: [String],
    }
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});

const Food = model("Food", foodSchema);
export default Food;
