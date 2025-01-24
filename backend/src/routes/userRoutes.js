import express from "express"
import { register, login, logout, updateProfile } from "../controller/userController.js";
import {protectRoute} from "../middlewares/authmiddleware.js";
export const userRouter = express.Router();

userRouter.post("/register", register); 
userRouter.post("/login", login); 
userRouter.post("/logout", logout); 

userRouter.put("/update-pic", protectRoute, updateProfile); //update profile


