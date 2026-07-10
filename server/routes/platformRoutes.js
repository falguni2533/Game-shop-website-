const express = require("express");

const {
  getPlatforms,
  getPlatformById,
  createPlatform,
  updatePlatform,
  deletePlatform,
} = require("../controllers/platformController");

const { protect } = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/adminMiddleware");

// Create Express router
const router = express.Router();

/* ==============================
         Public Routes
============================== */

// @route   GET /
// @desc    Get all platforms
// @access  Public
router.get("/", getPlatforms);


// @route   GET /:id
// @desc    Get platform by ID
// @access  Public
router.get("/:id", getPlatformById);

/* ==============================
      Private/Admin Routes
============================== */

// @route   POST /
// @desc    Create platform
// @access  Private/Admin
router.post("/", protect, admin, createPlatform);

// @route   PUT /:id
// @desc    Update platform
// @access  Private/Admin
router.put("/:id", protect, admin, updatePlatform);

// @route   DELETE /:id
// @desc    Delete platform
// @access  Private/Admin
router.delete("/:id", protect, admin, deletePlatform);

// Export router
module.exports = router;