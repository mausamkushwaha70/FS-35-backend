const { Model } = require("mongoose");
const { sendFile } = require("../services/storage.service");
const { default: userModel } = require("../model/user.model");

const registerController = async (req, res) => {
    try {
        let { userName, fullName, email, password, mobile, bio, dob } = req.body;
        let file = req.file;
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

        const newUser = await userModel.create({
            userName,
            fullName,
            email,
            password,
            mobile,
            bio,
            dob,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal sever error",
            error,
        });
    }
};
