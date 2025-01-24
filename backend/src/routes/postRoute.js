import express from "express"
import { protectRoute } from "../middlewares/authmiddleware.js";
import { createPost, getSinglePost, updatePost, deletePost, getAllPosts } from "../controller/postController.js";

export const postRouter = express.Router();


postRouter.post("/", protectRoute, createPost);
postRouter.get("/", getAllPosts); // Retrieve all psots


postRouter.route("/:id")
    .get(getSinglePost)                 
    .put(protectRoute, updatePost)      
    .delete(protectRoute, deletePost);   


