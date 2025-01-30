const express = require("express");
const authRouter = express.Router();
const User = require("../models/UserModel");


authRouter.post("/signup", async (req, res, next) => {
    try {
        const userData = req?.body;
        const { firstName, lastName, emailId, password } = userData;
        const newUser = await User.create({
            firstName,
            lastName,
            emailId,
            password
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
})


module.exports = authRouter;