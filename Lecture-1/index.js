
const express = require("express")
const app =  express()

app.get("/", (req, res) => {
    console.log("request recieved");
    res.send("all okay")
})

app.listen(8000,() => {
    console.log("server running 8000");
})