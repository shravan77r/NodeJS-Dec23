
const express = require("express")
const app = express()

app.get("/", (req, res) => {
    console.log("request recieved");
    return res.send("all okay")
})

//query
//api?key=val
app.get("/api", (req, res) => {
    console.log(req.query);
    console.log(req.query.key);
    return res.send("query api")
})

//params
app.get("/joke/:id/:id2", (req, res) => {
    console.log(req.params);
    console.log(req.params.id);
    return res.send(`params ${req.params.id}, ${req.params.id2}`)
})

app.listen(8000, () => {
    console.log("server running 8000");
})