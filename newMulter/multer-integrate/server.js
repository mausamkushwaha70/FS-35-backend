const express = require("express");
require("dotenv").config();
const app = express();
const cors = require("cors");
const postRoutes = require("./src/routes/post.routes");


app.use(express.json());
app.use("/api/posts", postRoutes);
app.use("/uploads", express.static("uploads"));

let PORT = process.env.port || 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use("/api/post", postRoutes);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
