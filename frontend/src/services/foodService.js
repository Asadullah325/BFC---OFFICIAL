import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/foods"; 

export const getFoods = async () => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}`);
        return data;
    } catch (error) {
        console.error("Error fetching foods:", error);
        return [];
    }
};

export const search = async (searchTerm) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/search/${searchTerm}`);
        return data;
    } catch (error) {
        console.error(`Error searching for "${searchTerm}":`, error);
        return [];
    }
};

export const getTags = async () => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/tags`);
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
        const { data } = await axios.get(`${API_BASE_URL}/tags/${tagName}`);
        return data;
    } catch (error) {
        console.error(`Error filtering foods by tag "${tagName}":`, error);
        return [];
    }
};

export const getFoodsById = async (id) => {
    try {
        const { data } = await axios.get(`${API_BASE_URL}/${id}`);
        return data;
    } catch (error) {
        console.error(`Error fetching food by ID "${id}":`, error);
        return null;
    }
};
