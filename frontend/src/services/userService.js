import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;


export const getUser = () => {
    try {
        return localStorage.getItem("user")
            ? JSON.parse(localStorage.getItem("user"))
            : null;
    } catch (error) {
        console.error(error.message);
        return null;
    }
};

export const login = async (email, password) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/users/login`, { email, password });
        localStorage.setItem("user", JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error?.response?.data || "Login failed");
        throw error; // Re-throw for proper error handling in calling components
    }
};

export const register = async (registerData) => {
    try {
        const { data } = await axios.post(`${API_BASE_URL}/users/register`, registerData);
        localStorage.setItem("user", JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error?.response?.data || "Registration failed");
        throw error; // Re-throw for proper error handling in calling components
    }
};

export const logout = () => {
    localStorage.removeItem("user");
    return true;
};
