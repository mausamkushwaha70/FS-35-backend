import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createReels, getReels } from "../controllers/reels.controller.js";
import { upload } from "../config/multer.js";
const router = express.Router();


router.post("/create-reels", authMiddleware, upload.single("video"), createReels)
router.get("/get-reels",authMiddleware,getReels)

export default router ;
