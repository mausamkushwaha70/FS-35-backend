import storyModel from "../model/story.model.js";
import userModel from "../model/user.model.js";
import { sendFile, deleteFile } from "../services/storage.service.js";

export const storyCreateController = async (req, res) => {
    try {
        const { caption } = req.body;
        const file = req.file;
        // console.log(req.body);
        // console.log(file);

        if (!file)
            return res.status(400).json({
                success: false,
                message: "file is required",
            });

        let media_Type;

        if (file.mimetype.startsWith("image")) {
            media_Type = "image";
        } else if (file.mimetype.startsWith("video")) {
            media_Type = "video";
        } else {
            return res.status(400).json({
                success: false,
                message: "Invalid media type ",
            });
        }

        const uploadFile = await sendFile(file.buffer, file.originalname);
        console.log(uploadFile);

        const story = await storyModel.create({
            user: req.user.id,
            media_type: media_Type,
            media_url: uploadFile.url,
            media_fileID: uploadFile.fileId,
            caption,
        });

        return res.status(201).json({
            success: true,
            message: "story created succesfully",
            story,
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

export const getStory = async (req, res) => {
    try {
        const user = await userModel.findById(req.user.id);

        if (!user)
            return res.status(400).json({
                success: false,
                message: "user is not found",
            });

        const fetchUser = [...user.followings, req.user.id];
        console.log(fetchUser);

        const story = await storyModel
            .find({
                user: { $in: fetchUser },
            })
            .sort({ createdAt: -1 })
            .populate("user", "userName profile_pic");

        return res.status(200).json({
            success: true,
            message: "stories fetched successfully",
            story,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "internal sever error",
            error: error.message,
        });
    }
};

export const viewStory = async (req, res) => {
    try {
        const storyId = req.params.id;
        const story = await storyModel.findById(storyId);
        console.log(storyId);
        console.log(story);
        if (!story)
            return res.status(400).json({
                success: false,
                message: "story not found",
            });

        if (String(story.user) === req.user.id) {
            return res.status(200).json({
                success: true,
                message: "you are watching your own story",
                story,
            });
        }
        const alreadyExist = story.viewers.includes(req.user.id);
        if (alreadyExist)
            return res.status(200).json({
                success: true,
                message: "you already view this story",
                story,
            });

        story.viewers.push(req.user.id);

        await story.save();

        return res.status(200).json({
            success: true,
            message: "story viewed successfully",
            viewers: story.viewers,
            count: story.viewers.length,
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

export const deleteStory = async (req, res) => {
    try {
        const storyId = req.params.id;
        const story = await storyModel.findById(storyId);
        if (!story) {
            return res.status(400).json({
                success: false,
                message: "stroy not found",
            });
        }

        if (String(story.user) !== req.user.id)
            return res.status(403).json({
                success: false,
                message: "forbidden",
            });

        await deleteFile(story.media_fileID);

        await story.deleteOne();

        return res.status(200).json({
            success: true,
            message: "story delted successfull",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};
