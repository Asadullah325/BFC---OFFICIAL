import jwt from "jsonwebtoken";
import { UNAUTHORIZED } from "../constants/httpStatus.js";

export const auth = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
        }

        const token = authHeader.split(" ")[1];

        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                console.error("JWT Verification Error:", err.message);
                return res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
            }

            req.user = decoded;
            next();
        });

    } catch (error) {
        console.error("Auth Middleware Error:", error.message);
        res.status(UNAUTHORIZED).json({ message: "Unauthorized" });
    }
};
