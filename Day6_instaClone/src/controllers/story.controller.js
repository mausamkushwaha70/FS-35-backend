import storyModel from "../model/story.model.js";
import { sendFile } from "../services/storage.service.js";

export const storyCreateController = async (req, res) => {
    const { caption } = req.body;
    const file = req.file;
    console.log(req.body);

    console.log(file);
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
    console.log(uploadFile)

    
    const story = await storyModel.create({
        user: req.user.id,
        media_type:media_Type,
        media_url: uploadFile.url,
        caption,
    });

    return res.status(201).json({
        success: true,
        message: "story created succesfully",
        story,
    });
};
