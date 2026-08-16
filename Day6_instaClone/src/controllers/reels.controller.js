import { json } from "express";
import reelsModel from "../model/reels.model.js";
import { sendFile } from "../services/storage.service.js";

export const createReels = async (req, res) => {
  try {
    const { caption, location } = req.body || {};
    console.log(req.body);
    const file = req.file;
    console.log(file);
    if (!file) {
      return res.status(400).json({
        success: false,
        message: "reels not found",
      });
    }

    let media_Type;

    if (file.mimetype.startsWith("video")) {
      media_Type = "video";
    } else {
      return res.status(400).json({
        success: false,
        message: "only video file can upload as reels",
      });
    }
    //  upload to ImageKit
    const uploadReels = await sendFile(file.buffer, file.originalname);
    console.log(uploadReels);

    // save reel in database {mongoDb}
    const reels = await reelsModel.create({
      user: req.user.id,
      media_type: media_Type,
      media_url: uploadReels.url,
      media_fileID: uploadReels.fileId,
      caption,
      location,
    });

    return res.status(201).json({
      success: true,
      message: "Reel created successfully",
      reels,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server error",
      error: error.message,
    });
  }
};

export const getReels = async (req, res) => {
  try {
    const allReels = await reelsModel.find();
    return res.status(200).json({
      success: true,
      message: "All reels fetched",
      allReels,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const likesReelsController = async (req, res) => {
  try {
    const reelId = req.params.id;
    const reel = await reelsModel.findById(reelId);

    if (!reel) {
      return res.status(404).json({
        success: false,
        message: "reels not found",
      });
    }

    const alreadyLike = reel.likes.some(
      (userId) => String(userId) === String(req.user.id),
    );

    if (alreadyLike) {
      reel.likes = reel.likes.filter(
        (userId) => String(userId) !== String(req.user.id),
      );

      await reel.save();
      return res.status(200).json({
        success: true,
        message: "reel unliked successfully",
        reel,
        likes: reel.likes,
        count: reel.likes.length,
      });
    }

    reel.likes.push(req.user.id);
    await reel.save();

    return res.status(200).json({
      success: true,
      message: "reel liked successfully",
      reel,
      likes: reel.likes,
      count: reel.likes.length,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
      error: error.message,
    });
  }
};

// export const unlikeReelsController = async (req, res) => {
//   const reelId = req.params.id;
//   const reel = await reelsModel.findById(reelId);

//   if (!reel)
//     return res.status(400).json({
//       success: false,
//       message: "reels not found",
//     });
// };
