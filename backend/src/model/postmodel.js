import mongoose from "mongoose";

const postSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
            unique: true,
        },
        content: {
            type: String,
            required: true,
        },
        imageName: {
            type: String,
            default: ""
        },
        imageUrl: {
            type: String,
            default: ""
        },
    },
    { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

export default Post;