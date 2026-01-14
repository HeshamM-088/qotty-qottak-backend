const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    provider: {
      type: String,
      enum: ["google"],
      default: "google",
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = new mongoose.model("Users", userSchema);
