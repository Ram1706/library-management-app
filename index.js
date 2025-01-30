const http = require("http");
const PORT = 7777;


const app = http.createServer((req, res) => {
    res.end("Hello from server");
});

app.listen(PORT, () => {
    console.log("Applicaation is running in port ", PORT);
})