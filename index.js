require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");
const userRouter = require("./routes/userRouter");

const app = express();
app.use(express.json());

// Adding routers
app.use("/", userRouter);

// Test Route added for checking purpose
app.use("/test", (req, res, next) => {
    res.send("Hello from server");
});

app.listen(PORT, () => {
    console.log("Applicaation is running in port ", PORT);
});


// To Handle the Errors
app.use("/", (err, req, res, next) => {
    if (err) {
        console.log("Something went wrong!", err);
        res.status(500).json({
            message: "Something went wrong!"
        });
    }
})