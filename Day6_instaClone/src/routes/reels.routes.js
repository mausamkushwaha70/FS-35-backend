import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { createReels } from "../controllers/reels.controller";
const router = express.Router();


router.post("/create-reels",authMiddleware,createReels)


export default router ;
