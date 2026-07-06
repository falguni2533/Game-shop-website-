const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
} = require("../controllers/authController");
const { protect } = require("../middlewares/authMiddleware");

// Create Express router
const router = express.Router();

// @route   POST /register
// @desc    Register a new user
// @access  Public
router.post("/register", registerUser);

// @route   POST /login
// @desc    Authenticate user and get token
// @access  Public
router.post("/login", loginUser);

// @route   POST /logout
// @desc    Logout user and clear cookie
// @access  Private
router.post("/logout", protect, logoutUser);

// @route   GET /profile
// @desc    Get current logged-in user's profile
// @access  Private
router.get("/profile", protect, getUserProfile);

// Export the router
module.exports = router;