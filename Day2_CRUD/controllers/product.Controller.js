const ProductModel = require("../models/product.model");

// Create Product

const createProductController = async (req, res) => {
  try {
    const { productName, description, price } = req.body;

    if (!productName || !description || !price) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const newProduct = await ProductModel.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Successfull Product created",
      data: newProduct,
    });
  } catch (error) {
    console.log("error in create api", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//  Read Product

const getProductController = async (req, res) => {
  try {
    let Product = await ProductModel.findOne();
    return res.status(200).json({
      success: true,
      message: "All products fetched",
      data: Product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server Error",
    });
  }
};

// Read Product By ID
const GetProductController = async (req, res) => {
  try {
    const { id } = req.params;
    let Product = await ProductModel.findById(id);
    if (!Product) {
      return res.status(404).json({
        success: false,
        message: "Product not Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: "product fetched",
      data: Product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: ("Internal server Error", error),
    });
  }
};

// Update Product

const updateProductController = async (req, res) => {
  try {
    const { id } = req.params;
    const { productName, description, price } = req.body;
    const Product = await ProductModel.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!Product) {
      return res.status(404).josn({
        success: false,
        message: "Product not updated",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Product successfully update",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: ("Internal server error", error),
    });
  }
};

//Delete Product

const deleteProductController = async (req, res) => {
  let { id } = req.params;

  try {
    let Product = await ProductModel.findByIdAndDelete(id);

    if (!Product) {
      res.status(404).json({
        success: false,
        message,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product Successfully deleted",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: true,
      message: "Internal server error",
    });
  }
};

module.exports = {
  createProductController,
  getProductController,
  GetProductController,
  updateProductController,
  deleteProductController,
};
