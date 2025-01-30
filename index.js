const http = require("http");
require("dotenv").config();
const PORT = process.env.PORT;

const app = http.createServer((req, res) => {
    res.end("Hello from server");
});

app.listen(PORT, () => {
    console.log("Applicaation is running in port ", PORT);
})