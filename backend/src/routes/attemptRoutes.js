const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const {
  startTest,
  submitTest,
  getAllAttempts,
  reviewAttempt,
  getMyAttempts
} = require("../controllers/attemptController");

// const {
//     verifyToken,
//     authorize,
// } = require("../middleware/authMiddleware");

router.get(
    "/my-attempts",
    authMiddleware,
    authorize("candidate"),
    getMyAttempts
);

router.get(
  "/",
  authMiddleware,
  authorize("superadmin", "admin"),
  getAllAttempts
);

router.get(
  "/start/:testId",
  authMiddleware,
  authorize("candidate"),
  startTest
);

router.post(
  "/submit",
  authMiddleware,
  authorize("candidate"),
  submitTest
);

router.get(
  "/review/:attemptId",
  authMiddleware,
  authorize("candidate", "admin", "superadmin"),
  reviewAttempt
);

module.exports = router;