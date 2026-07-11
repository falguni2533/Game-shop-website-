const express = require("express");

const {
  getGames,
  getGameById,
  getGameBySlug,
  createGame,
  updateGame,
  deleteGame,
  addReview,
} = require("../controllers/gameController");

const { protect } = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/adminMiddleware");

// Create Express router
const router = express.Router();

/* ==============================
         Public Routes
============================== */

// @route   GET /
// @desc    Get all games
// @access  Public
router.get("/", getGames);

// @route   GET /slug/:slug
// @desc    Get game by slug
// @access  Public
router.get("/slug/:slug", getGameBySlug);

// @route   POST /review/:id
// @desc    Add a review to a game
// @access  Private
router.post("/review/:id", protect, addReview);

// @route   GET /:id
// @desc    Get game by ID
// @access  Public
router.get("/:id", getGameById);

/* ==============================
      Private/Admin Routes
============================== */

// @route   POST /
// @desc    Create a new game
// @access  Private/Admin
router.post("/", protect, admin, createGame);

// @route   PUT /:id
// @desc    Update a game
// @access  Private/Admin
router.put("/:id", protect, admin, updateGame);

// @route   DELETE /:id
// @desc    Delete a game
// @access  Private/Admin
router.delete("/:id", protect, admin, deleteGame);

// Export the router
module.exports = router;