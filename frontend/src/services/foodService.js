import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getFoods = async () => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/foods`);
        return data;
    } catch (error) {
        console.error("Error fetching foods:", error);
        return [];
    }
};

export const search = async (searchTerm) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/foods/search/${searchTerm}`);
        return data;
    } catch (error) {
        console.error(`Error searching for "${searchTerm}":`, error);
        return [];
    }
};

export const getTags = async () => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/foods/tags`);
        return data;
    } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
};

export const filterFoodsByTag = async (tagName) => {
    if (tagName === "All") {
        return getFoods();
    }
    try {
        const { data } = await axios.get(`${API_BASE_URL}/foods/tags/${tagName}`);
        return data;
    } catch (error) {
        console.error(`Error filtering foods by tag "${tagName}":`, error);
        return [];
    }
};

export const getFoodsById = async (id) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/foods/${id}`);
        return data;
    } catch (error) {
        console.error(`Error fetching food by ID "${id}":`, error);
        return null;
    }
};
