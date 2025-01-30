const express = require("express");
const User = require("../models/UserModel");
const userRouter = express.Router();

// To add a new users
userRouter.post("/user", async (req, res, next) => {
    try {
        const userData = req?.body;
        const { firstName, lastName, emailId, age } = userData;
        const newUser = await User.create({
            firstName,
            lastName,
            age,
            emailId
        });
        res.status(200).json({
            message: "User Added Successfully",
            data: newUser
        });
    } catch (e) {
        res.status(500).json({
            message: "User not added successfully" + e,
        });
    }
})

module.exports = userRouter;