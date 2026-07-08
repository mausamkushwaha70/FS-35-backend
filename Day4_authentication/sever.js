require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const Dbconnect = require("./src/config/db");
const router = require("./src/routes/user.route");
const homeRoutes = require('./src/routes/home.routes')


let app = express();
Dbconnect();

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", router);
app.use("/api/home", homeRoutes);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
