import { sample_foods, sample_tags } from "../data";


export const getFoods = async () => sample_foods;

export const search = async (searchTerm) =>
    sample_foods.filter((food) =>
        food.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
    );

export const getTags = async () => sample_tags;

export const filterFoodsByTag = async (tagName) => {
    if (tagName === "All") return getFoods();
    return sample_foods
        .filter((food) => food.tags?.includes(tagName));
}

export const getFoodsById = async (id) => sample_foods.find((food) => food.id === Number(id));

