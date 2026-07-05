const Publisher = require("../models/Publisher");

/**
 * @desc    Get all publishers
 * @route   GET /api/publishers
 * @access  Public
 */
const getPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.find().sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "Publishers fetched successfully",
      data: publishers,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Get publisher by ID
 * @route   GET /api/publishers/:id
 * @access  Public
 */
const getPublisherById = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);

    if (!publisher) {
      return res.status(404).json({
        success: false,
        message: "Publisher not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Publisher fetched successfully",
      data: publisher,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Publisher not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Create publisher
 * @route   POST /api/publishers
 * @access  Private/Admin
 */
const createPublisher = async (req, res) => {
  try {
    const publisher = await Publisher.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Publisher created successfully",
      data: publisher,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Publisher already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Update publisher
 * @route   PUT /api/publishers/:id
 * @access  Private/Admin
 */
const updatePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!publisher) {
      return res.status(404).json({
        success: false,
        message: "Publisher not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Publisher updated successfully",
      data: publisher,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);

      return res.status(400).json({
        success: false,
        message: messages.join(", "),
      });
    }

    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Publisher already exists",
      });
    }

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Publisher not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Delete publisher
 * @route   DELETE /api/publishers/:id
 * @access  Private/Admin
 */
const deletePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findByIdAndDelete(req.params.id);

    if (!publisher) {
      return res.status(404).json({
        success: false,
        message: "Publisher not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Publisher deleted successfully",
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Publisher not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getPublishers,
  getPublisherById,
  createPublisher,
  updatePublisher,
  deletePublisher,
};