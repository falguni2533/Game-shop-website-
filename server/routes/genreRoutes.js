const express = require("express");

const {
  getGenres,
  getGenreById,
  getGenreBySlug,
  createGenre,
  updateGenre,
  deleteGenre,
} = require("../controllers/genreController");

const { protect } = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/adminMiddleware");

// Create Express router
const router = express.Router();

/* ==============================
         Public Routes
============================== */

// @route   GET /
// @desc    Get all genres
// @access  Public
router.get("/", getGenres);

// @route   GET /slug/:slug
// @desc    Get genre by slug
// @access  Public
router.get("/slug/:slug", getGenreBySlug);

// @route   GET /:id
// @desc    Get genre by ID
// @access  Public
router.get("/:id", getGenreById);

/* ==============================
      Private/Admin Routes
============================== */

// @route   POST /
// @desc    Create genre
// @access  Private/Admin
router.post("/", protect, admin, createGenre);

// @route   PUT /:id
// @desc    Update genre
// @access  Private/Admin
router.put("/:id", protect, admin, updateGenre);

// @route   DELETE /:id
// @desc    Delete genre
// @access  Private/Admin
router.delete("/:id", protect, admin, deleteGenre);

// Export router
module.exports = router;