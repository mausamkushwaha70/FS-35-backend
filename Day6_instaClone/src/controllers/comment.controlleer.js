import commentModel from "../model/comment.model.js";
import PostModel from "../model/post.model.js";

export const createCommentController = async (req, res) => {
    try {
        const { _id, text } = req.body;
        console.log(req.body);

        if (!_id || !text) {
            return res.status(400).json({
                success: false,
                message: "both fields are required",
            });
        }

        const post = await PostModel.findById(_id);
        console.log(post);

        if (!post) {
            return res.status(400).json({
                success: false,
                message: "Post not found",
            });
        }

        const comment = await commentModel.create({
            text,
            post: _id,
            user: req.user.id,
        });

        console.log(comment);

        post.comments.push(comment._id);
        await post.save();

        return res.status(200).json({
            success: true,
            message: "comment created successfully",
            comment,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message,
        });
    }
};



export const getCommentController = async (req, res) => {
    try {
        const postId = req.params.id;
        console.log(postId);

        if (!postId)
            return res.status(404).json({
                success: false,
                message: "postId is required",
            });

        const post = await PostModel.findById(postId).populate({
            path: "comments",
            populate: {
                path: "user",
                select: "userName profile_pic",
            },
        });

        if (!post)
            return res.status(404).json({
                success: false,
                message: "Post not found",
            });

        return res.status(200).json({
            success: true,
            message: "comment fetched successfully",
            comment: post.comments,
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};



export const editCommentController = async (req,res) =>{
    try {
        const commentId = req.params.id
        console.log(commentId);

        const {editComment} = req.body
        console.log(editComment)

        if(!commentId || !editComment) return res.status(400).json({
            success:false,
            message:"CommentId and editComment is required"
        })

        const comment =  await commentModel.findById(commentId)
        // console.log(comment)

        if(!comment) return res.status(404).json({
            success:false,
            message:"commet is requrired for edit"
        })
        
        if(!(String(comment.user)=== req.user.id)) return res.status(403).json({
            success:false,
            message:"forbidden"
        })

        comment.text = editComment

        await comment.save()

        return res.status(200).json({
            success:true,
            message:"comment edit successfully"
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"internal server error",
            error:error.message
        })
    }
}



export const deleteCommentController = async (req, res) => {
    try {
        const commentId = req.params.id;
        console.log(commentId);
        if (!commentId) {
            return res.status(400).json({
                success: false,
                message: "commnet Id id required",
            });
        }

        const comment = await commentModel.findById(commentId);

        if (!comment) {
            return res.status(404).json({
                success: false,
                message: "No comment here",
            });
        }

        if (!(String(comment.user) === req.user.id))
            return res.status(403).json({
                success: false,
                message: "forrbidden",
            });

        const post = await PostModel.findById(comment.post);
        post.comments.pull(commentId);

        await commentModel.findOneAndDelete(commentId);

        await post.save();

        return res.status(200).json({
            success: true,
            message: "comment delete Successfully",
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "internal server error",
            error: error.message,
        });
    }
};
