const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/authMiddleware");
const authorize = require("../middleware/roleMiddleware");

const { createTest, getAllTests, updateTest, deleteTest } = require("../controllers/testController");

router.get(
  "/",
  authMiddleware,
  authorize("superadmin", "candidate", "admin"),
  getAllTests
);

router.put(
  "/:id",
  authMiddleware,
  authorize("superadmin"),
  updateTest
);

router.delete(
  "/:id",
  authMiddleware,
  authorize("superadmin"),
  deleteTest
);

router.post(
  "/create",
  authMiddleware,
  authorize("superadmin"),
  createTest
);

module.exports = router;