const express = require("express");
const {
  createProductController,
  getProductController,
  GetProductController,
  updateProductController,
  deleteProductController,
} = require("../controllers/product.Controller");

const route = express.Router();

route.post("/create", createProductController);
route.get("/read", getProductController);
route.get("/read/:id", GetProductController);
route.put("/update/:id", updateProductController);
route.delete("/delete/:id", deleteProductController);

module.exports = route;
