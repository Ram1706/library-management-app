require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const userRouter = require("./routes/userRouter");
const database = require("./config/database");

const app = express();
app.use(express.json());

// Adding routers
app.use("/", userRouter);

// Test Route added for checking purpose
app.use("/test", (req, res, next) => {
    res.send("Hello from server");
});

app.listen(PORT, async () => {
    try {
        await database.authenticate();
        console.log('DB Connection has been established successfully.');
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