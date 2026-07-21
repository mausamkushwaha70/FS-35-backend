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
    location: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

const PostModel = mongoose.model("post", postSchema);
export default PostModel;
