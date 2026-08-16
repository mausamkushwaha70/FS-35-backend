import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createReels, getReels, likesReelsController, reelViewsController } from "../controllers/reels.controller.js";
import { upload } from "../config/multer.js";
const router = express.Router();


router.post("/create-reels", authMiddleware, upload.single("video"), createReels)
router.get("/get-reels",authMiddleware,getReels)
router.post("/reel-likes/:id",authMiddleware, likesReelsController)
router.post("/reel-views/:id",authMiddleware,reelViewsController)


export default router ;
