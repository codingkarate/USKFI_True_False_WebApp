const mongoose = require("mongoose");

const testSchema = new mongoose.Schema(
  {
    testName: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    duration: {
      type: Number,
      default: 15, // seconds per question
    },

    totalQuestions: {
      type: Number,
      default: 0,
    },

    startTime: {
      type: Date,
    },

    endTime: {
      type: Date,
    },

    isActive: {
      type: Boolean,
      default: false,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Test", testSchema);