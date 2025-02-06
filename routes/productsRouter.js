const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Product = require("../models/Products");
const PurchaseOrder = require("../models/PurchaseOrder");

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

productsRouter.post("/products/purchase", authMiddleware, async (req, res, next) => {
    try {
        debugger;
        const loggedInUser = req?.user;
        const purchaseData = req?.body || {};
        const { purchaseQty, itemName } = purchaseData;

        const purchaseProduct = await Product.findOne({ where: { itemName: itemName } });

        console.log("==purchaseProduct==", purchaseProduct);

        if (!purchaseProduct) {
            res.status(500).json({
                message: "Item is not available for purchase",
            });
        }

        const newPurchaseOrderData = await PurchaseOrder.create({
            purchaseQty,
            productId: purchaseProduct?.id,
            purchaseDate: new Date(),
            userId: loggedInUser?.id
        })

        res.status(200).json({
            message: "Purchase order request Created",
            data: newPurchaseOrderData
        });

    } catch (error) {
        res.status(500).json({
            message: "Purchase order request failed" + error,
        });
    }
});

module.exports = productsRouter;