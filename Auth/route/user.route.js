import express from "express";
import { registerController } from "../controller/usercontroller.js";

const router = express.Router();

// Registration route with error handling
router.post("/register", async (req, res, next) => {
  try {
    await registerController(req, res);
  } catch (error) {
    console.error("Registration Error:", error);
    next(error); // Pass to error handling middleware
  }
});

// Add more routes as needed
router.get("/test", (req, res) => {
  res.json({ message: "User routes working!" });
});

export default router;