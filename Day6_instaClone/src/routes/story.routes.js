import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {storyCreateController} from "../controllers/story.controller.js"
import { upload } from "../config/multer.js";

const router = express.Router()

router.post("/create-story",authMiddleware,upload.single("image"),storyCreateController)

export default router;