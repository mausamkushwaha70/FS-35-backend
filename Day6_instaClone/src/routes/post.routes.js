import express from "express";
import { createPostController, deletePostController, getAllPostController, updatePostController } from "../controllers/post.controller.js";
import { upload } from "../config/multer.js";


const router = express.Router();

router.post("/", upload.array("images", 5),createPostController);
router.get("/get",getAllPostController)
router.patch("/update/:id", updatePostController)
router.delete("/delete/:id", deletePostController);


export default router