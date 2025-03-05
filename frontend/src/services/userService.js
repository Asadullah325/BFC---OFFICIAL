import axios from "axios";

const API_BASE_URL = "http://localhost:3000/api/users";

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
        const { data } = await axios.post(`${API_BASE_URL}/login`, { email, password });
        localStorage.setItem("user", JSON.stringify(data));
        return data;
    } catch (error) {
        console.log(error?.response?.data || "Login failed"); 
        throw error; // Re-throw for proper error handling in calling components
    }
};

export const logout = () => {
    localStorage.removeItem("user");
    return true;
};
