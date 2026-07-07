const Test = require("../models/Test");

const createTest = async (req, res) => {
  try {
    const {
      testName,
      description,
      duration,
      startTime,
      endTime,
    } = req.body;

    const test = await Test.create({
      testName,
      description,
      duration,
      startTime,
      endTime,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Test created successfully",
      test,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllTests = async (req, res) => {
  try {
    const tests = await Test.find().populate(
      "createdBy",
      "username fullName role"
    );

    res.status(200).json({
      success: true,
      count: tests.length,
      tests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const updateTest = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await Test.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Test updated successfully",
      test,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteTest = async (req, res) => {
  try {
    const { id } = req.params;

    const test = await Test.findByIdAndDelete(id);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Test deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createTest,
  getAllTests,
  updateTest,
  deleteTest,
};