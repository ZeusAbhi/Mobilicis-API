import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRouter from "./user/userRoutes";
import mongoose from "mongoose"
dotenv.config();

const app = express();
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/test";
mongoose.connect(mongoURI);
mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB");
})

// middleware
app.use(cors());

// routes
app.use("/users", userRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
})

