require("dotenv").config();
const PORT = process.env.PORT;
const express = require("express");

const app = express();
app.use(express.json());

// Test Route added for checking purpose
app.use("/test", (req, res, next) => {
    res.send("Hello from server");
});

app.listen(PORT, () => {
    console.log("Applicaation is running in port ", PORT);
});