const Attempt = require("../models/Attempt");
const Test = require("../models/Test");
const Question = require("../models/Question");

/*
=========================================
Start Test
=========================================
*/

const startTest = async (req, res) => {
  try {
    const { testId } = req.params;

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    const questions = await Question.find({ test: testId })
      .select("-correctAnswer -explanation");

    res.status(200).json({
      success: true,
      test,
      questions,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

/*
=========================================
Submit Test
=========================================
*/

const submitTest = async (req, res) => {
  try {

    const { testId, answers, timeTaken } = req.body;

    console.log("========== REQUEST BODY ==========");
    console.log(req.body);
    console.log("==================================");

    const test = await Test.findById(testId);

    if (!test) {
      return res.status(404).json({
        success: false,
        message: "Test not found",
      });
    }

    let totalMarks = 0;
    let obtainedMarks = 0;

    const evaluatedAnswers = [];

    for (const answer of answers) {

        console.log("Received Answer:", answer);

      const question = await Question.findById(answer.questionId);

      console.log("Question Found:", question);

      if (!question) continue;

      totalMarks += question.marks;

      const isCorrect =
        answer.selectedAnswer === question.correctAnswer;
        
        console.log("Is Correct:", isCorrect);

      const marksObtained = isCorrect ? question.marks : 0;

      obtainedMarks += marksObtained;

      evaluatedAnswers.push({
        question: question._id,
        selectedAnswer: answer.selectedAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        marksObtained,
      });

    }

    const percentage =
      totalMarks === 0
        ? 0
        : Number(((obtainedMarks / totalMarks) * 100).toFixed(2));

        console.log("Evaluated Answers:", evaluatedAnswers);
        console.log("Total Marks:", totalMarks);
        console.log("Obtained Marks:", obtainedMarks);
        console.log("Percentage:", percentage);

    console.log("Submitting as user:", req.user);

    const attempt = await Attempt.create({
        

      candidate: req.user.id,

      test: testId,

      answers: evaluatedAnswers,

      totalMarks,

      obtainedMarks,

      percentage,

      timeTaken,

      status: "Completed",

    });


    const existingAttempt = await Attempt.findOne({
      candidate: req.user.id,
      test: testId,
    });

if (existingAttempt) {
    return res.status(400).json({
        success: false,
        message:
            "You have already submitted this test."
    });
}

    res.status(201).json({
      success: true,
      message: "Test submitted successfully",
      result: {
        attemptId: attempt._id,
        totalMarks,
        obtainedMarks,
        percentage,
      },
      attempt,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getAllAttempts = async (req, res) => {
  try {

    const attempts = await Attempt.find()
      .populate("candidate", "fullName username")
      .populate("test", "testName");

    res.status(200).json({
      success: true,
      count: attempts.length,
      attempts,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

/*
=========================================
Review Attempt
=========================================
*/

const reviewAttempt = async (req, res) => {
  try {

    const { attemptId } = req.params;

    const attempt = await Attempt.findById(attemptId)
      .populate("test", "testName")
      .populate("candidate", "fullName username")
      .populate({
        path: "answers.question",
        model: "Question",
      });

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Attempt not found",
      });
    }

    const review = attempt.answers.map((answer) => ({

      questionId: answer.question._id,

      question: answer.question.question,

      optionTrue: answer.question.optionTrue,

      optionFalse: answer.question.optionFalse,

      selectedAnswer: answer.selectedAnswer,

      correctAnswer: answer.correctAnswer,

      isCorrect: answer.isCorrect,

      explanation: answer.question.explanation,

      marksObtained: answer.marksObtained,

    }));

    res.status(200).json({
      success: true,

      attemptId: attempt._id,

      candidate: attempt.candidate,

      test: attempt.test,

      totalMarks: attempt.totalMarks,

      obtainedMarks: attempt.obtainedMarks,

      percentage: attempt.percentage,

      review,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const getMyAttempts = async (req, res) => {
  try {

    const attempts = await Attempt.find({
      candidate: req.user.id,
    })
      .populate("test", "testName duration")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: attempts.length,
      attempts,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  startTest,
  submitTest,
  getAllAttempts,
  reviewAttempt,
  getMyAttempts,
};