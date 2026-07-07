const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },

    fullName: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      default: "",
    },

    role: {
      type: String,
      enum: ["superadmin", "admin", "candidate"],
      default: "candidate",
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);