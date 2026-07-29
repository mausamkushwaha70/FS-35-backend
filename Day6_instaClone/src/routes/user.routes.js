import express from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  changePassController,
  followUsersController,
  getFollowerController,
  getFollowingsController,
  getUserProfileController,
  myPrfileController,
  profileUpdateController,
  searchUserController,
  unfollowUserController,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/myProfile", authMiddleware, myPrfileController);
router.patch("/update", authMiddleware, profileUpdateController);
router.get("/userProfile/:userName",authMiddleware,getUserProfileController)
router.get("/searchUser/",authMiddleware,searchUserController)
router.patch("/follow/:id",authMiddleware, followUsersController)
router.patch("/unfollow/:id",authMiddleware,unfollowUserController)
router.patch("/unfollow/:id",authMiddleware,unfollowUserController)
router.get("/:id/follower",authMiddleware,getFollowerController)
router.get("/:id/following",authMiddleware,getFollowingsController)
router.patch("/changePassword",authMiddleware, changePassController)
export default router;
  