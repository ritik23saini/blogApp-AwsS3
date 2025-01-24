import dotenv from 'dotenv';
import express from 'express';
import cors from "cors";
import { connectDB } from "./utils/db.js";
import { userRouter } from './routes/userRoutes.js';
import { postRouter } from './routes/postRoute.js';
import cookieParser from 'cookie-parser';
import multer from 'multer';
import path from 'path';

const app = express();

const _dirname = path.resolve();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage })

//config
dotenv.config();
app.use(express.json());
app.use(cookieParser());

//cors
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));


//routes
app.use("/api", userRouter);
app.use("/api/posts", upload.single('image'), postRouter);


const Port = process.env.PORT || 8002;

// Serve static files from the frontend build directory
app.use(express.static(path.join(_dirname, "/frontend/dist")));

// Catch-all route to serve index.html for SPA routes

app.use("*", (_, res) => {
    res.sendFile(path.resolve(_dirname, 'frontend', 'dist', 'index.html'));
});//if any other url is given except above then it will serve the index.html file i.e frontend

app.listen(Port, () => {
    connectDB();
    console.log(`Server started at: http://localhost:${Port}`);
});
