import e from "express";
import Post from "../model/postmodel.js";
import { deletefromS3, retrieveFrom_S3, uploadto_S3 } from "../utils/Aws_S3_service.js";

export const createPost = async (req, res) => {

    const { title, content } = req.body;
    const file = req.file;

    if (!title || !content) {
        return res.status(500).json({ message: "Data not Found please enter all fields" })
    }
    try {
        let imageName = '';
        if (file) {
            imageName = await uploadto_S3(file);//file uploaded to s3
            if (!imageName) {
                res.json({ message: "Error uploading Image to Server " })
            }
        }
        const userId = req.user._id;
        const newPost = new Post({
            userId,
            title,
            content,
            imageName
        })
        if (newPost) {
            await newPost.save();
            return res.status(201).send('Post Created')
        }
        else {
            res.status(400).json({ message: "Error saving" });
        }
    } catch (error) {
        console.log("Error in create post controller:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find({});
        const updatedPosts = await retrieveFrom_S3(posts); // set signed URL
        return res.status(200).json(updatedPosts);


    } catch (error) {
        console.error("Error in getAllPosts:", error);
        res.status(500).json({ message: error.message });
    }
};

export const getSinglePost = async (req, res) => {

    try {
        const postID = req.params.id;
        const post = await Post.findById(postID);
        if (!post) {
            return res.status(403).json({ message: "Post not found" });
        }
        return res.status(201).json(post);


    } catch (error) {
        console.log(`error in getSinglePost:${error}`);
        res.status(500).json({ message: "Server Error" });
    }
}

export const updatePost = async (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(404).json({ message: "Data not Found please enter all fields" })
    }

    try {
        const old_PostId = req.params.id;
        const owner_UserId = req.user._id;

        const old_Post = await Post.findById(old_PostId);

        if (old_Post.userId.toString() != owner_UserId.toString()) {
            return res.status(500).json({ message: "Not authorized you ara not the owner of this post" });
        }


        old_Post.title = title || old_Post.title;
        old_Post.content = content || old_Post.content;
        /*  old_Post.postImg = postImg || old_Post.postImg; */

        await old_Post.save();
        return res.json({ message: "Post updated successfully" });

    } catch (error) {
        console.log(`error in updatePost:${error}`);
        res.status(500).json({ message: "Server Error" });
    }
}

export const deletePost = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);

        if (!post) return res.status(404).json({ message: "Post not found" });

        if (post.userId.toString() !== req.user._id.toString()) {
            //Because post.userId is an ObjectId and req.user._id is also an ObjectId (or sometimes a string), a direct comparison (!==) i.e post.userId !== req.user._id may fail.
            return res.status(403).json({ message: "Not authorized" });
        }
        deletefromS3(post.imageName);
        await post.deleteOne();
        res.json({ message: "Post deleted successfully" });

    } catch (error) {
        console.log(`error in deletePost`);
        res.status(500).json({ message: "Server Error" });
    }
}

