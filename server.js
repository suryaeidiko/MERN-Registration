require('dotenv').config();
const express = require("express");
const connectDb = require("./utils/DB") 

const app = express();
const route = require("./router/auth-router");

app.use(express.json());

app.use("/api", route);

// app.get("/", (req,res) => {
//     res.status(200).send("Hello from Backend");
// })
// app.get("/home", (req,res) => {
//     res.status(200).send("This is your Home page");
// })

connectDb().then(() => {
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
})
})