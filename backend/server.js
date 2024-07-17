import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";

import connectMongoDB from "./db/connectMongoDB.js";

dotenv.config();

// connect to cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json()); // to parse req.body
app.use(express.urlencoded({ extended: true })); // to parse form data

app.use(cookieParser()); // to parse cookies

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/post", postRoutes);

app.listen(PORT, () => {
  console.log("server is running in ", PORT);
  connectMongoDB();
});
