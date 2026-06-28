const express = require("express");
const DBconnect = require("./config/db");
const productRoutes = require("./routes/product.routes");

DBconnect();

let app = express();
app.use(express.json());

app.use("/product", productRoutes);

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});