require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const Dbconnect = require("./src/config/db");
const router = require("./src/routes/user.route");

let app = express();
Dbconnect();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});
