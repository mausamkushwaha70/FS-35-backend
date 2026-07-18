import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import userModel from "../model/user.model.js";


export const authMiddleware = async (req,res, next)=>{
    try {
        let token = req.cookies.accessToken;

        if(!token){
            return res.status(404).json({
                success:false,
                message:"Token not found",
            })
        }

        let decode = jwt.verify(token, process.env.JWT_SECRET)
        
        if(!decode){
            return res.status(401).json({
                success:false,
                message:"unauthorized",
            })
        }
        
        const user = await userModel.findById(decode.id).select("-password")
        
        req.user = user
        next();

    } catch (error) {
        return res.status(500).json({
            success:false,
            message:"Validation error",
            error,
        })
    }

}