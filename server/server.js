require("dotenv").config();
const express = require("express");

const app = express();

app.get("/getRestaurants", (req, res) => {
    console.log("get all restaurants");
});
//http://localhost:3000/getrestaurants

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`server is up and listening on port ${port}`);
});