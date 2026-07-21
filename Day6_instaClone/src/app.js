import dotenv from "dotenv";
dotenv.config();
import express from "express";
import authRoute from "../src/routes/auth.routes.js"
import cookieParser from "cookie-parser";
import postRouter from "../src/routes/post.routes.js"

const app = express()
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute)
app.use("/api/post", postRouter)

export default app;
