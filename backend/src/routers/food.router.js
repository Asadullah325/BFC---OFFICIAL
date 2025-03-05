import { Router } from "express";
import Food from "../models/food.model.js";
import handler from "express-async-handler";

const router = Router();

router.get("/", handler(
    async (req, res) => {
        const foods = await Food.find({});
        res.json(foods);
    }
));

router.get("/tags", handler(
    async (req, res) => {
        const tags = await Food.aggregate(
            [
                { $unwind: "$tags" },
                {
                    $group: {
                        _id: "$tags",
                        count: { $sum: 1 }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        name: "$_id",
                        count: "$count"
                    }
                }
            ]
        ).sort({ count: -1 });

        const all = {
            name: "All",
            count: await Food.countDocuments()
        };

        tags.unshift(all);

        res.json(tags);
    }
));

router.get("/search/:searchTerm", handler(
    async (req, res) => {
        const { searchTerm } = req.params;

        const searchRegex = new RegExp(searchTerm, "i");

        const foods = await Food.find({ name: { $regex: searchRegex } });
        res.json(foods);
    }
));

router.get("/tags/:tagName", handler(
    async (req, res) => {
        const { tagName } = req.params;
        const foods = await Food.find({ tags: tagName });
        res.json(foods);
    }
));

router.get("/:foodId", handler(
    async (req, res) => {
        const { foodId } = req.params;
        const food = await Food.findById(foodId);
        res.json(food);
    }
));

export default router;