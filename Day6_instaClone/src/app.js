import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoute from "../src/routes/auth.routes.js";
import cookieParser from "cookie-parser";
import postRouter from "../src/routes/post.routes.js";
import userRouter from "../src/routes/user.routes.js";
import commnetRouter from "../src/routes/comment.routes.js";
import storyRouter from "../src/routes/story.routes.js"

const app = express();
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/post", postRouter);
app.use("/api/user", userRouter);
app.use("/api/comment", commnetRouter);
app.use("/api/story",storyRouter)

export default app;
