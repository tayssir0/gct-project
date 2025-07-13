import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import userRoutes from "../Auth/route/user.route.js";

dotenv.config();

const app = express();

app.use(cors()); 
app.use(express.json()); 

// Routes
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;
const MongoDB = process.env.MONGO_URI;

// bd
mongoose.connect(MongoDB)
  .then(() => {
    console.log("✅ mongoDB is connected");

    const dbName = mongoose.connection.name;
    console.log("📦 Connected to database:", dbName);

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err);
  });
