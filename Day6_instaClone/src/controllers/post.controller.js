import PostModel from "../model/post.model.js";
import { sendFile } from "../services/storage.service.js";

export const createPostController = async (req, res) => {
  try {
    let { caption, location } = req.body;
    const files = req.files;

    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "media is required",
      });
    }
    const uploadMedia = await Promise.all(
      files.map(async (elem) => {
        return await sendFile(elem.buffer, elem.originalname);
      }),
    );

    const newPost = await PostModel.create({
      caption,
      location,
      media_url: uploadMedia.map((elem) => elem.url),
    });

    return res.status(201).json({
      success: true,
      message: "Post create sucessfully",
      data: newPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const getAllPostController = async (req, res) => {
  try {
    let allPost = await PostModel.find();

    return res.status(200).json({
      success: true,
      message: "All Posts fetched",
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: "internal server error",
    });
  }
};

export const updatePostController = async (req, res) => {
  try {
    const post_id = req.params.id;

    let updatePost = await PostModel.findByIdAndUpdate(
      post_id,
      {
        $set: req.body,
      },
      {
        new: true,
      },
    );

    if (!updatePost) {
      return res.status(400).json({
        success: false,
        message: "Post not found"
      });
    }


    return res.status(200).json({
      success: true,
      message: "Successfully updated",
      data: updatePost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const deletePostController = async (req, res) => {
  try {
    let {id} = req.params
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Post id is required",
      });
    }

    const deletedPost = await PostModel.findByIdAndDelete(id);
    if (!deletedPost) {
      return res.status(404).json({
        success: false,
        message: "Post not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "P ost deleted successfully",
      data: deletedPost,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
