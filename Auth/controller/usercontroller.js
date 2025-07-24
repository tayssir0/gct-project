import UserModel from "../model/user.model.js";
import bcrypt from "bcryptjs";

export const registerController = async (req, res) => {
    const { name, email, password } = req.body;

    // Validation
    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required",
            fieldErrors: {
                name: !name ? "Name is required" : null,
                email: !email ? "Email is required" : null,
                password: !password ? "Password is required" : null
            }
        });
    }

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({
            success: false,
            message: "Invalid email format"
        });
    }

    try {
        // Check existing user
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(409).json({  // 409 Conflict
                success: false,
                message: "User already exists"
            });
        }

        // Password hashing
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create new user
        const newUser = await UserModel.create({
            name,
            email,
            password: hashedPassword
        });

        // Omit password in response
        const userResponse = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            createdAt: newUser.createdAt
        };

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: userResponse
        });

    } catch (error) {
        console.error("Registration Error:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        });
    }
};