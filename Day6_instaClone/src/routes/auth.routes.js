import express from "express";
import { loginController, registerController } from "../controllers/auth.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {upload} from "../config/multer.js"
const router = express.Router();

router.post("/register",upload.single("image") ,registerController);
router.post("/login",authMiddleware,loginController);



export default router;