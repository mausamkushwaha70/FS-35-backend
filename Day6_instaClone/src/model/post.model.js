import mongoose from "mongoose";
const postSchema = new mongoose.Schema(
  {
    media_url: [
      {
        type: String,
        require: true,
      },
    ],

    caption: {
      type: String,
    },

    likes: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "user",
      },
    ],

    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "comments",
      },
    ],

    location: {
      type: String,
    },

  },
  { timestamps: true },
);

const PostModel = mongoose.model("post", postSchema);
export default PostModel;
