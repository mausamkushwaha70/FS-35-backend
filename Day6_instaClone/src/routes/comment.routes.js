import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
    createCommentController,
    deleteCommentController,
    editCommentController,
    getCommentController,
} from "../controllers/comment.controlleer.js";

const router = express.Router();

router.post("/create", authMiddleware, createCommentController);
router.get("/getComment/:id",authMiddleware, getCommentController);
router.patch("/editComment/:id",authMiddleware,editCommentController)
router.delete("/delete/:id", authMiddleware, deleteCommentController);

export default router;
