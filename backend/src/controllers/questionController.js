const Question = require("../models/Question");
const Test = require("../models/Test");

const addQuestion = async (req, res) => {
  try {
    const {
      test,
      question,
      correctAnswer,
      explanation,
      marks,
      questionNumber,
    } = req.body;

    // Check if test exists
    const existingTest = await Test.findById(test);

    if (!existingTest) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    // Create question
    const newQuestion = await Question.create({
      test,
      question,
      correctAnswer,
      explanation,
      marks,
      questionNumber,
    });

    // Update total questions
    existingTest.totalQuestions += 1;
    await existingTest.save();

    res.status(201).json({
      success: true,
      message: "Question added successfully",
      question: newQuestion,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getQuestionsByTest = async (req, res) => {
  try {
    const { testId } = req.params;

    const questions = await Question.find({ test: testId })
      .sort({ questionNumber: 1 });

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllQuestions = async (req, res) => {
  try {

    const questions = await Question.find()
      .populate("test", "testName");

    res.status(200).json({
      success: true,
      count: questions.length,
      questions,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const updateQuestion = async (req, res) => {
  try {
    const { id } = req.params;

    const question = await Question.findByIdAndUpdate(
      id,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      question,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);

    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    // Decrease total questions in the test
    await Test.findByIdAndUpdate(question.test, {
      $inc: { totalQuestions: -1 },
    });

    res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  addQuestion,
  getQuestionsByTest,
  getAllQuestions,
  updateQuestion,
  deleteQuestion,
};