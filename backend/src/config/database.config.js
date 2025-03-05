import { connect, set } from "mongoose";
import User from "../models/user.model.js";
import Food from "../models/food.model.js";
import { sample_foods, sample_users } from "../data.js";
import bcrypt from "bcryptjs";

const PASSWORD_SALT = 12;

set('strictQuery', true);

export const connectDB = async () => {
    try {
        const conn = await connect(process.env.MONGO_URI);
        console.log(`MongoDB connected: ${conn.connection.host}`);
        await seedUsers();
        await seedFoods();
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

async function seedUsers() {
    try {
        const userCount = await User.countDocuments();
        if (userCount > 0) {
            console.log("Users Seed Data already exists!");
            return;
        }

        for (let user of sample_users) {
            user.password = await bcrypt.hash(user.password, PASSWORD_SALT);
            await User.create(user);
        }

        console.log("Users Seed Data created!");

    } catch (error) {
        console.log(error);
    }
}

export const seedFoods = async () => {
    try {
        const foodCount = await Food.countDocuments();
        if (foodCount > 0) {
            console.log("Foods Seed Data already exists!");
            return;
        }
        for (let food of sample_foods) {
            await Food.create(food);
        }
        console.log("Foods Seed Data created!");
    } catch (error) {
        console.log(error);
    }
}
