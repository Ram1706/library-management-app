const express = require("express");
const User = require("../models/UserModel");
const userRouter = express.Router();

// To get all the Users
userRouter.get("/user", async (req, res, next) => {
    try {
        const availableUsers = await User.findAll({});
        res.status(200).json({
            message: "User Details fetched Successfully",
            data: availableUsers
        });
    } catch (e) {
        res.status(500).json({
            message: "User Details not fetched Successfully" + e,
        });
    }
})

module.exports = userRouter;