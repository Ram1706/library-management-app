const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Product = require("../models/Products");

const productsRouter = express.Router();


productsRouter.post("/products", authMiddleware, async (req, res, next) => {
    try {
        const loggedInUser = req?.user;
        const { itemName = "", itemPrice = 0.0 } = req?.body;

        const newProduct = await Product.create({
            itemName,
            itemPrice,
            userId: loggedInUser?.id
        });
        
        res.status(200).json({
            message: "Product added successfully",
            data: newProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "Products not added" + error,
        });
    }
});

module.exports = productsRouter;