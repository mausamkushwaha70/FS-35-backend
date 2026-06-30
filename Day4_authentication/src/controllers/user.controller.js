const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
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

// const loginController = async (req, res) => {
//   try {
//     let { email} = req.body;

//     const user = await userModel.findOne( {email} );
//     if (!user) {
//       return res.status(400).json({
//         message: "user not found",
//         success: false,
//       });
//     }
//     return res.status(200).json({
//       message: "LoggedIn successfully",
//       success: true,
//       data: user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

module.exports = {
  registerController,
  
};
