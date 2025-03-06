import axios from "axios";

axios.interceptors.request.use(
    req => {
        try {
            const user = JSON.parse(localStorage.getItem("user")) || {};
            if (user.token) {
                req.headers["Authorization"] = `Bearer ${user.token}`;
            }
        } catch (error) {
            console.error("Error parsing user token:", error);
        }
        return req;
    },
    err => Promise.reject(err)
);

axios.interceptors.response.use(
    res => res,
    err => Promise.reject(err)
);