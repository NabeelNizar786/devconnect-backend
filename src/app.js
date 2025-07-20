const express = require("express");
const app = express();
const PORT = 3000

app.use("/test", (req,res) => {
    res.send("testing hello")
})

app.use("/hello", (req, res) => {
    res.send("Hello World from admi")
})

app.get('/getthat', (req,res) => {
    res.send('<h1>HELLO GET IT NOW </h1>')
})

app.listen(PORT, () => console.log(`listening on ${PORT}`));