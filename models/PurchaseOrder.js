const Sequelize = require("sequelize");
const database = require("../config/database");

const Product = require("./Products");
const User = require("./UserModel");

const PurchaseOrder = database.define("PurchaseOrders", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        allowNull: false,
        primaryKey: true
    },
    purchaseQty: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    productId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: Product,
            key: "id"
        }
    },
    purchaseDate: {
        type: Sequelize.DATE,
        allowNull: false,
    },
    userId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: User,
            key: "id"
        }
    }
}, {
    tablename: "PurchaseOrders",
    timestamps: true
});


module.exports = PurchaseOrder;