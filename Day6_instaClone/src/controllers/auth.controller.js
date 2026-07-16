import mongoose from "mongoose";
import { sendFile } from "../services/storage.service.js";
import userModel from "../model/user.model.js";
import bcrypt from "bcrypt";
import { generate } from "../utills/token.js";

export const registerController = async (req, res) => {
  try {
    let { userName, fullName, email, password, mobile, bio, dob } = req.body;
    let file = req.file;
    console.log(file);
    if (
      !userName ||
      !fullName ||
      !email ||
      !password ||
      !mobile ||
      !bio ||
      !dob
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const uploadFile = await sendFile(file.buffer, file.originalname);
    console.log(uploadFile);
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

    const hashPass = await bcrypt.hashSync(password);

    return res.status(201).json({
      success: true,
      user: newUser,
    });

    const accessToken = generate(newUser._id, "1h");
    const refreshToken = generate(newUser._id, "1d");

    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 60 * 1000,
    });

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 60 * 1000,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal sever error",
      error,
    });
  }
};

const loginController = async (req, res) => {
  try {
    let { userName, password } = req.body;
    if (!userName || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const isExist = await userModel.findOne({ email }.select("-password"));
    if(!isExist){
        return res.status(404).json({
            success:false,
            message:"User not found"
        })
        
    }
  } catch (error) {}
};
