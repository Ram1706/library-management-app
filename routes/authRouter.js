const express = require("express");
const authRouter = express.Router();
const User = require("../models/UserModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");


authRouter.post("/signup", async (req, res, next) => {
    try {
        const userData = req?.body;
        const { firstName, lastName, emailId, password } = userData;
        const hashedPassword = await bcryptjs.hash(password.trim(), 10);
        const newUser = await User.create({
            firstName,
            lastName,
            emailId,
            password: hashedPassword
        });
        res.status(200).json({
            message: "User signup Successfull",
            data: newUser
        });
    } catch (e) {
        res.status(500).json({
            message: "User signup failed" + e,
        });
    }
});

authRouter.post("/login", async (req, res, next) => {
    try {
        const userData = req?.body;
        const { emailId, password: userEnteredPassowrd } = userData;
        const exitsingUser = await User.findOne({ where: { emailId: emailId } });
        if (!exitsingUser) {
            return res.status(401).json({
                message: "Credentails are not valid",
            });
        }
        const isValidPassword = await bcryptjs.compare(userEnteredPassowrd, exitsingUser?.password);
        if (!isValidPassword) {
            return res.status(401).json({
                message: "Credentails are not valid",
            });
        } else {
            const privateKey = process.env.PRIVATE_KEY;
            const jwtToken = await jwt.sign({ id: exitsingUser?.id, emailId: exitsingUser.emailId }, privateKey, {
                expiresIn: '15m'
            });
            res.cookie("token", jwtToken, {
                httpOnly: true,  // Prevents client-side JavaScript access
                secure: true,    // Ensures cookie is sent over HTTPS
                sameSite: 'Strict', // Protects against CSRF attacks
                maxAge: 15 * 60 * 1000 // 15 minutes in milliseconds);
            });
            return res.status(200).json({
                message: "User Login Successfull",
                data: exitsingUser
            });
        }
    } catch (e) {
        return res.status(401).json({
            message: "Credentails are not valid" + e,
        });
    }
});

authRouter.post("/logout", async (req, res, next) => {
    try {
        res.cookie("token", "", { expires: new Date(0), httpOnly: true });
        return res.status(200).json({
            message: "User Logout Successfull!",
        });
    } catch (e) {
        return res.status(500).json({
            message: "User Logout failed!" + e,
        });
    }
});


module.exports = authRouter;