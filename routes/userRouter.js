const express = require("express");
const userRouter = express.Router();

// To add a new users
userRouter.post("/user", (req, res, next) => {
    try {
        const userData = req?.body;
        res.status(200).json({
            message: "User Added Successfully",
            data: userData
        });
    } catch (e) {
        res.status(500).json({
            message: "User not added successfully"
        });
    }
})

module.exports = userRouter;