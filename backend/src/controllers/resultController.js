const Attempt = require("../models/Attempt");



const getCandidateResult = async (req, res) => {
  try {

    const attempt = await Attempt.findById(req.params.attemptId)
      .populate("test", "testName duration")
      .populate(
        "answers.question",
        "question correctAnswer explanation marks"
      );

    if (!attempt) {
      return res.status(404).json({
        success: false,
        message: "Result not found",
      });
    }

    console.log("========== RESULT API ==========");
    console.log("req.user =", req.user);
    console.log("Attempt Candidate =", attempt.candidate.toString());
    console.log("Logged User ID =", req.user.id);
    console.log("Role =", req.user.role);
    console.log("================================");

    if (
      attempt.candidate.toString() !== req.user.id &&
      req.user.role !== "superadmin"
    ) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      result: attempt,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  getCandidateResult,
};