const express = require("express");

const {
  getCategories,
  getCategoryById,
  getCategoryBySlug,
  createCategory,
  updateCategory,
  deleteCategory,
} = require("../controllers/categoryController");

const { protect } = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/adminMiddleware");

// Create Express router
const router = express.Router();

/* ==============================
         Public Routes
============================== */

// @route   GET /
// @desc    Get all categories
// @access  Public
router.get("/", getCategories);

// @route   GET /slug/:slug
// @desc    Get category by slug
// @access  Public
router.get("/slug/:slug", getCategoryBySlug);

// @route   GET /:id
// @desc    Get category by ID
// @access  Public
router.get("/:id", getCategoryById);

/* ==============================
      Private/Admin Routes
============================== */

// @route   POST /
// @desc    Create category
// @access  Private/Admin
router.post("/", protect, admin, createCategory);

// @route   PUT /:id
// @desc    Update category
// @access  Private/Admin
router.put("/:id", protect, admin, updateCategory);

// @route   DELETE /:id
// @desc    Delete category
// @access  Private/Admin
router.delete("/:id", protect, admin, deleteCategory);

// Export router
module.exports = router;