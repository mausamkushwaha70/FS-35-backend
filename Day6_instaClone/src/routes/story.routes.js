import express from "express"
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { getStory, storyCreateController, viewStory} from "../controllers/story.controller.js"
import { upload } from "../config/multer.js";

const router = express.Router()

router.post("/create-story",authMiddleware,upload.single("image"),storyCreateController)
router.get("/getStory", authMiddleware,getStory)
router.post("/view-Story/:id",authMiddleware, viewStory)
export default router;