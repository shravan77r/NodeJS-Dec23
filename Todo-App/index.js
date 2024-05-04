
const express = require("express")
const clc = require("cli-color");
require("dotenv").config();
const mongoose = require("mongoose");
const { cleanUpAndValidate } = require("./utils/authUtils");
const userModel = require("./models/userModel");

// constants
const app = express();
const PORT = process.env.PORT;

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log(clc.green("MongoDb Connected"));
    })
    .catch((err) => {
        console.log(clc.redBright(err));
    });

// middleware
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// routes
app.get("/", (req, res) => {
    return res.send("okay at home")
});

app.get("/register", (req, res) => {
    return res.render("register");
});

app.post("/register", async (req, res) => {
    console.log(req.body);
    //data validation
    const { name, email, username, password } = req.body;
   
    try {
        await cleanUpAndValidate({email, password, name, username});
    } catch (error) {
        return res.send({
            status: 400,
            error: error,
        });
    }
    //unique fileds should be 
    //create a user in db
    const userObj = new userModel({
        name:name,
        email:email,
        username:username,
        password:password
    });
    
    try {
        const userDb = await userObj.save();
        return res.send({
            status:201,
            message:"User created successfully",
            data:userDb
        })
    } catch (error) {
        return res.send({
            status:500,
            message:"Database error",
            error:error
        });
    }
});

app.get("/login", (req, res) => {
    return res.render("login");
});

app.listen(PORT, () => {
    console.log(clc.yellowBright("Server is running"));
    console.log(`server running on port ${PORT}`)
});