const express = require("express");
const router = express.Router();

const {
  verifyToken,
  isSuperAdmin,
} = require("../middleware/authMiddleware");

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const { addQuestion, getQuestionsByTest, getAllQuestions, updateQuestion, deleteQuestion } = require("../controllers/questionController");

router.get(
  "/",
  authMiddleware,
  authorize("superadmin", "admin"),
  getAllQuestions
);

router.get(
  "/test/:testId",
  authMiddleware,
  authorize("superadmin", "candidate"),
  getQuestionsByTest
);

router.put(
  "/:id",
  authMiddleware,
  authorize("superadmin"),
  updateQuestion
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("superadmin"),
  deleteQuestion
);

router.post(
  "/add",
  authMiddleware,
  authorize("superadmin"),
  addQuestion
);

module.exports = router;