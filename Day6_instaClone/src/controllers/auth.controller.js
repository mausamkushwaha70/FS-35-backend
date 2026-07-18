import mongoose from "mongoose";
import { sendFile } from "../services/storage.service.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utills/token.js";
import jwt from "jsonwebtoken";

export const registerController = async (req, res) => {
  try {
    let { userName, fullName, email, password, mobile, bio, dob } = req.body;
    let file = req.file;

    if (!userName || !fullName || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadFile = await sendFile(file.buffer, file.originalname);
    
    const newUser = await userModel.create({
      userName,
      fullName,
      email,
      password,
      mobile,
      bio,
      dob,
      profile_pic: uploadFile.url,
    });

    // const hashPass = await bcrypt.hashSync(password);

    const accessToken = generateToken(newUser._id, "1h");
    const refreshToken = generateToken(newUser._id, "1d");

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      user: newUser, 
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal sever error",
      error: error.message,
    });
  }
};

export const loginController = async (req, res) => {
  try {
    let { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const isExist = await userModel.findOne({email});
    console.log(isExist)
    if (!isExist) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

const isPasswordCorrect = isExist.comparePass(password);

    if (!isPasswordCorrect) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const accessToken = generateToken(isExist._id, "15min");
    const refreshToken = generateToken(isExist._id, "1d");

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    const userData = isExist.toObject();
    delete userData.password;

    return res.status(200).json({
      success: true,
      message: "User loggedIn",
      
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error:error.message,
    });
    console.log(error)
  }
};

const updateController = async (req, res) => {};
