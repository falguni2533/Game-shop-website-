const Platform = require("../models/Platform");

/**
 * @desc    Get all platforms
 * @route   GET /api/platforms
 * @access  Public
 */
const getPlatforms = async (req, res) => {
  try {
    const platforms = await Platform.find().sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "Platforms fetched successfully",
      data: platforms,
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
 * @desc    Get platform by ID
 * @route   GET /api/platforms/:id
 * @access  Public
 */
const getPlatformById = async (req, res) => {
  try {
    const platform = await Platform.findById(req.params.id);

    if (!platform) {
      return res.status(404).json({
        success: false,
        message: "Platform not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Platform fetched successfully",
      data: platform,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Platform not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Create platform
 * @route   POST /api/platforms
 * @access  Private/Admin
 */
const createPlatform = async (req, res) => {
  try {
    const platform = await Platform.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Platform created successfully",
      data: platform,
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
        message: "Platform already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Update platform
 * @route   PUT /api/platforms/:id
 * @access  Private/Admin
 */
const updatePlatform = async (req, res) => {
  try {
    const platform = await Platform.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!platform) {
      return res.status(404).json({
        success: false,
        message: "Platform not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Platform updated successfully",
      data: platform,
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
        message: "Platform already exists",
      });
    }

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Platform not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Delete platform
 * @route   DELETE /api/platforms/:id
 * @access  Private/Admin
 */
const deletePlatform = async (req, res) => {
  try {
    const platform = await Platform.findByIdAndDelete(req.params.id);

    if (!platform) {
      return res.status(404).json({
        success: false,
        message: "Platform not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Platform deleted successfully",
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Platform not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getPlatforms,
  getPlatformById,
  createPlatform,
  updatePlatform,
  deletePlatform,
};