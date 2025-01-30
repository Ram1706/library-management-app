const express = require("express");
const User = require("../models/UserModel");
const userRouter = express.Router();
const authMiddleware = require("../middleware/authMiddleware")

// To get all the Users
userRouter.get("/user", authMiddleware, async (req, res, next) => {
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
});

//  To get the signedin user
userRouter.get("/profile", authMiddleware, async (req, res, next) => {
    try {
        const loggedInUser = req?.user || {};
        const loggedInUserInfo = await User.findOne({ where: { id: loggedInUser?.id } });
        res.status(200).json({
            message: "User Profile Detail fetched Successfully",
            data: loggedInUserInfo
        });
    } catch (e) {
        res.status(500).json({
            message: "User Profile Details not fetched Successfully" + e,
        });
    }
});

module.exports = userRouter;