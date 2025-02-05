require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const cookiePasrser = require("cookie-parser");
const database = require("./config/database");

// Routers 
const userRouter = require("./routes/userRouter");
const authRouter = require("./routes/authRouter");
const productsRouter = require("./routes/productsRouter");

// Importing Modeles
const User = require("./models/UserModel");
const Product = require("./models/Products");


const app = express();
app.use(express.json());
app.use(cookiePasrser());

// Adding routers
app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", productsRouter);

// Test Route added for checking purpose
app.use("/test", (req, res, next) => {
    res.send("Hello from server");
});

// 🔹 Establish Relationships Here
User.hasMany(Product, { foreignKey: "userId", onDelete: "CASCADE" });
Product.belongsTo(User, { foreignKey: "userId" });

app.listen(PORT, async () => {
    try {
        await database.authenticate();
        console.log('DB Connection has been established successfully.');

        // await database.sync({ force: true }); // force: true drops existing tables & recreates them
        // console.log("Database synced!");

        console.log("Application is running in port ", PORT);
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});


// To Handle the Errors
app.use("/", (err, req, res, next) => {
    if (err) {
        res.status(500).json({
            message: "Something went wrong!"
        });
    }
})