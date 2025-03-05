import { Router } from "express";
import jwt from "jsonwebtoken";
import { BAD_REQUEST } from "../constants/httpStatus.js";
import handler from "express-async-handler";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


const router = Router()

router.post("/login", handler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email })

    if (user && (await bcrypt.compare(password, user.password))) {
        res.send(generateToken(user))
        return
    }
    res.status(BAD_REQUEST).send("Invalid email or password")
}))

const generateToken = (user) => {
    const token = jwt.sign({
        id: user.id,
        email: user.email,
        isAdmin: user.isAdmin
    },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }
    )

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