const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookie = require("cookie-parser");
const registerController = async (req, res) => {
  try {
    let { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    let hashPass = bcrypt.hashSync(password, 10);

    let newUser = await userModel.create({
      name,
      email,
      password: hashPass,
    });

    let token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(201).json({
      message: "User registered",
      success: true,
      data: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

const loginController = async (req, res) => {
  // Validation Layer

  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required",
      });
    }

    // User Lookup Layer

    const isUserExists = await userModel.findOne({ email });
    if (!isUserExists) {
      return res.status(404).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // Password Verification Layer

    const comparePass = bcrypt.compareSync(password, isUserExists.password);
    if (!comparePass) {
      return res.status(401).json({
        success: false,
        message: "Invalid credential",
      });
    }

    // Authentication Layer

    const token = jwt.sign(
      { id: isUserExists._id },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );

    // Set Cookie

    res.cookie("token", token);

    return res.status(200).json({
      message: "LoggedIn successfully",
      success: true,
      isUserExists,
      token,
      
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

module.exports = {
  registerController,
  loginController,
};
