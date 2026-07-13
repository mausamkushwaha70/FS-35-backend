require("dotenv").config();
const express = require("express");
const router = require("./src/routes/post.route");
const app = express();

const PORT = process.env.port || 5000;

app.use("/api/post", router);

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`);
});
