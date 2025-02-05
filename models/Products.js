const Sequelize = require("sequelize");
const database = require("../config/database");
const User = require("./UserModel");


const Products = database.define("Products", {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    itemName: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    itemPrice: {
        type: Sequelize.FLOAT,
        allowNull: false
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
    tableName: "Products",
    timestamps: true
});


module.exports = Products;