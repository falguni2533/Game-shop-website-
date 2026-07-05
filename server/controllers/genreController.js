const Genre = require("../models/Genre");

/**
 * @desc    Get all genres
 * @route   GET /api/genres
 * @access  Public
 */
const getGenres = async (req, res) => {
  try {
    const genres = await Genre.find().sort({ name: 1 });

    return res.status(200).json({
      success: true,
      message: "Genres fetched successfully",
      data: genres,
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
 * @desc    Get genre by ID
 * @route   GET /api/genres/:id
 * @access  Public
 */
const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id);

    if (!genre) {
      return res.status(404).json({
        success: false,
        message: "Genre not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Genre fetched successfully",
      data: genre,
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Genre not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Create genre
 * @route   POST /api/genres
 * @access  Private/Admin
 */
const createGenre = async (req, res) => {
  try {
    const genre = await Genre.create(req.body);

    return res.status(201).json({
      success: true,
      message: "Genre created successfully",
      data: genre,
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
        message: "Genre already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Update genre
 * @route   PUT /api/genres/:id
 * @access  Private/Admin
 */
const updateGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!genre) {
      return res.status(404).json({
        success: false,
        message: "Genre not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Genre updated successfully",
      data: genre,
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
        message: "Genre already exists",
      });
    }

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Genre not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

/**
 * @desc    Delete genre
 * @route   DELETE /api/genres/:id
 * @access  Private/Admin
 */
const deleteGenre = async (req, res) => {
  try {
    const genre = await Genre.findByIdAndDelete(req.params.id);

    if (!genre) {
      return res.status(404).json({
        success: false,
        message: "Genre not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Genre deleted successfully",
    });
  } catch (error) {
    console.error(error);

    if (error.name === "CastError") {
      return res.status(404).json({
        success: false,
        message: "Genre not found",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  getGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
};