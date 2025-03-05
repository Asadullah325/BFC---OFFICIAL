import { Router } from "express";
import { sample_users } from "../data.js";
import jwt from "jsonwebtoken";
import { BAD_REQUEST } from "../constants/httpStatus.js";

const router = Router()

router.post("/login", (req, res) => {
    const { email, password } = req.body;
    const user = sample_users.find(
        (user) =>
            user.email === email &&
            user.password === password
    )
    if (user) {
        res.send(generateToken(user))
        return
    }
    res.status(BAD_REQUEST).send("Invalid email or password")
})

const generateToken = (user) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    }, "secret123", { expiresIn: "30d" })
    return {
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin,
        name: user.name,
        address: user.address,
        token
    }
}

export default router