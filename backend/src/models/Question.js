const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    test: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Test",
      required: true,
    },

    question: {
      type: String,
      required: true,
      trim: true,
    },

    optionTrue: {
      type: String,
      default: "True",
    },

    optionFalse: {
      type: String,
      default: "False",
    },

    correctAnswer: {
      type: String,
      enum: ["True", "False"],
      required: true,
    },

    explanation: {
      type: String,
      default: "",
    },

    marks: {
      type: Number,
      default: 1,
    },

    questionNumber: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Question", questionSchema);