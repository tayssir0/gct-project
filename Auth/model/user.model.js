import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
    trim: true,
    maxlength: [50, "Name cannot exceed 50 characters"],
    minlength: [2, "Name should have at least 2 characters"]
  },
  email: {
    type: String,
    required: [true, "Please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, "Please enter a password"],
    minlength: [8, "Password must be at least 8 characters"],
    select: false // Never return password in queries
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Password hashing middleware
userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Virtual for profile (optional)
userSchema.virtual("profile").get(function() {
  return {
    _id: this._id,
    name: this.name,
    email: this.email,
    createdAt: this.createdAt
  };
});

const UserModel = mongoose.model("User", userSchema);

export default UserModel;