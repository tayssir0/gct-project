import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRoutes from "../Auth/route/user.route.js";

dotenv.config();

const app = express();

// Middleware pour parser le JSON
app.use(express.json());

// Routes
app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 3000;
const MongoDB = process.env.MONGO_URI;

// Connecter à MongoDB puis démarrer le serveur
mongoose.connect(MongoDB)
  .then(() => {
    console.log("mongoDB is connected");

    app.listen(PORT, () => {
      console.log(`server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB:", err);
  });
