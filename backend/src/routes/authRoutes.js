const express = require("express");
const router = express.Router();

// const { login } = require("../controllers/authController");

const authMiddleware = require("../middleware/authMiddleware");

const authorize = require("../middleware/roleMiddleware");

const { login, createUser, getAllUsers, updateUser, deleteUser } = require("../controllers/authController");

router.post("/login", login);

router.put(
  "/update-user/:id",
  authMiddleware,
  authorize("superadmin"),
  updateUser
);

router.get("/profile", authMiddleware, (req, res) => {
  res.status(200).json({
    success: true,
    message: "Protected route accessed successfully",
    user: req.user,
  });
});

router.get(
  "/superadmin",
  authMiddleware,
  authorize("superadmin"),
  (req, res) => {
    res.status(200).json({
      success: true,
      message: "Welcome Super Admin",
    });
  }
);

router.post(
  "/create-user",
  authMiddleware,
  authorize("superadmin"),
  createUser
);

router.get(
  "/users",
  authMiddleware,
  authorize("superadmin", "admin"),
  getAllUsers
);

router.delete(
  "/delete-user/:id",
  authMiddleware,
  authorize("superadmin"),
  deleteUser
);

module.exports = router;