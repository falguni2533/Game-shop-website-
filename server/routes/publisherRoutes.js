const express = require("express");

const {
  getPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
} = require("../controllers/publisherController");

const { protect } = require("../middlewares/authMiddleware");
const { admin } = require("../middlewares/adminMiddleware");

// Create Express router
const router = express.Router();

/* ==============================
         Public Routes
============================== */

// @route   GET /
// @desc    Get all publishers
// @access  Public
router.get("/", getPublishers);

// @route   GET /:id
// @desc    Get publisher by ID
// @access  Public
router.get("/:id", getPublisherById);

/* ==============================
      Private/Admin Routes
============================== */

// @route   POST /
// @desc    Create publisher
// @access  Private/Admin
router.post("/", protect, admin, createPublisher);

// @route   PUT /:id
// @desc    Update publisher
// @access  Private/Admin
router.put("/:id", protect, admin, updatePublisher);

// @route   DELETE /:id
// @desc    Delete publisher
// @access  Private/Admin
router.delete("/:id", protect, admin, deletePublisher);

// Export router
module.exports = router;