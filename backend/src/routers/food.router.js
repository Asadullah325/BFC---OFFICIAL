import { Router } from "express";
import { sample_foods, sample_tags } from "../data.js";
const router = Router();

router.get("/", async (req, res) => {
    res.json(sample_foods);
});

router.get("/tags", async (req, res) => {
    res.json(sample_tags);
});

router.get("/search/:searchTerm", async (req, res) => {
    const { searchTerm } = req.params;
    const foods = sample_foods.filter((food) =>
        food.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );
    res.json(foods);
});

router.get("/tags/:tagName", async (req, res) => {
    const { tagName } = req.params;
    const foods = sample_foods.filter((food) => food.tags?.includes(tagName));
    res.json(foods);
});

router.get("/:foodId", async (req, res) => {
    const { foodId } = req.params;
    const food = sample_foods.find((food) => food.id == foodId);
    res.json(food);
});

export default router;