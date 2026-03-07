import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";

// Load .env from project root (unless in test environment)
if (process.env.NODE_ENV !== "test") {
  dotenv.config({ path: path.resolve(".env") });
}

const app = express();

app.use(express.json());

// Connect to MongoDB (except in test environment where setup.js handles it)
if (process.env.NODE_ENV !== "test" && process.env.MONGO_URI) {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.error("MongoDB connection error:", err.message));
}

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

export default app;