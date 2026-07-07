const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const {
  getCandidateResult,
} = require("../controllers/resultController");

router.get(
  "/:attemptId",
  authMiddleware,
  authorize("candidate"),
  getCandidateResult
);

module.exports = router;