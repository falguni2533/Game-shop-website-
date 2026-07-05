const Game = require('../models/Game');
const Category = require('../models/Category');
const Genre = require('../models/Genre');
const Platform = require('../models/Platform');
const Publisher = require('../models/Publisher');
 
// Fields to select when populating referenced documents.
// Keeps API responses lean by avoiding unnecessary data.
const CATEGORY_SELECT = 'name slug';
const GENRE_SELECT = 'name slug';
const PLATFORM_SELECT = 'name slug';
const PUBLISHER_SELECT = 'name slug';
 
/**
 * Helper: Validates that a Category, Publisher, and every Genre/Platform
 * ID provided actually exist in the database.
 *
 * Used by both createGame and updateGame to avoid duplicated logic.
 *
 * @param {Object} payload - Contains category, publisher, genres, platforms IDs
 * @returns {String|null} - Returns an error message if invalid, otherwise null
 */
const validateReferences = async ({ category, publisher, genres, platforms }) => {
  // Validate Category (only if provided)
  if (category) {
    const categoryExists = await Category.exists({ _id: category });
    if (!categoryExists) return 'Invalid Category';
  }
 
  // Validate Publisher (only if provided)
  if (publisher) {
    const publisherExists = await Publisher.exists({ _id: publisher });
    if (!publisherExists) return 'Invalid Publisher';
  }
 
  // Validate every Genre ID (only if provided)
  if (genres) {
    const genreList = Array.isArray(genres) ? genres : [genres];
    const genreCount = await Genre.countDocuments({ _id: { $in: genreList } });
    if (genreCount !== genreList.length) return 'Invalid Genre';
  }
 
  // Validate every Platform ID (only if provided)
  if (platforms) {
    const platformList = Array.isArray(platforms) ? platforms : [platforms];
    const platformCount = await Platform.countDocuments({ _id: { $in: platformList } });
    if (platformCount !== platformList.length) return 'Invalid Platform';
  }
 
  return null;
};
 
/**
 * Helper: Chains the standard population used across Game queries.
 * Keeps getGames, getGameById, getGameBySlug, and updateGame consistent.
 */
const populateGameRefs = (query) =>
  query
    .populate('category', CATEGORY_SELECT)
    .populate('genres', GENRE_SELECT)
    .populate('platforms', PLATFORM_SELECT)
    .populate('publisher', PUBLISHER_SELECT);
 
/**
 * @desc    Get all games with pagination, search, filtering, and sorting
 * @route   GET /api/games
 * @access  Public
 */
const getGames = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 20,
      search,
      category,
      genre,
      platform,
      publisher,
      featured,
      trending,
      bestSeller,
      sort,
    } = req.query;
 
    // Build the MongoDB filter object dynamically based on provided query params
    const filter = {};
 
    if (search) {
      // Case-insensitive partial match on title
      filter.title = { $regex: search, $options: 'i' };
    }
 
    if (category) filter.category = category;
    if (genre) filter.genres = genre; // matches if genre ID is in the genres array
    if (platform) filter.platforms = platform; // matches if platform ID is in the platforms array
    if (publisher) filter.publisher = publisher;
 
    // Boolean filters - only apply if explicitly passed
    if (featured !== undefined) filter.featured = featured === 'true';
    if (trending !== undefined) filter.trending = trending === 'true';
    if (bestSeller !== undefined) filter.bestSeller = bestSeller === 'true';
 
    // Whitelist of fields allowed for sorting, to prevent arbitrary/unsafe sort injection
    const allowedSortFields = ['price', 'releaseDate', 'averageRating', 'createdAt'];
    let sortOption = { createdAt: -1 }; // default sort: newest first
 
    if (sort) {
      const sortField = sort.startsWith('-') ? sort.substring(1) : sort;
      const sortDirection = sort.startsWith('-') ? -1 : 1;
 
      if (allowedSortFields.includes(sortField)) {
        sortOption = { [sortField]: sortDirection };
      }
    }
 
    // Convert pagination params to numbers and guard against invalid values
    const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
    const limitNumber = Math.max(parseInt(limit, 10) || 20, 1);
    const skip = (pageNumber - 1) * limitNumber;
 
    // Run the query and the count in parallel for efficiency
    const [games, totalGames] = await Promise.all([
      populateGameRefs(Game.find(filter).sort(sortOption).skip(skip).limit(limitNumber)),
      Game.countDocuments(filter),
    ]);
 
    const totalPages = Math.max(Math.ceil(totalGames / limitNumber), 1);
 
    return res.status(200).json({
      success: true,
      message: 'Games fetched successfully',
      pagination: {
        totalGames,
        currentPage: pageNumber,
        totalPages,
        limit: limitNumber,
      },
      data: games,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
 
/**
 * @desc    Get a single game by MongoDB ID
 * @route   GET /api/games/:id
 * @access  Public
 */
const getGameById = async (req, res) => {
  try {
    const game = await populateGameRefs(Game.findById(req.params.id));
 
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }
 
    return res.status(200).json({
      success: true,
      message: 'Game fetched successfully',
      data: game,
    });
  } catch (error) {
    // Invalid ObjectId format
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }
 
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
 
/**
 * @desc    Get a single game by its slug
 * @route   GET /api/games/slug/:slug
 * @access  Public
 */
const getGameBySlug = async (req, res) => {
  try {
    const game = await populateGameRefs(Game.findOne({ slug: req.params.slug }));
 
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }
 
    return res.status(200).json({
      success: true,
      message: 'Game fetched successfully',
      data: game,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
 
/**
 * @desc    Create a new game
 * @route   POST /api/games
 * @access  Private/Admin
 */
const createGame = async (req, res) => {
  try {
    const { category, publisher, genres, platforms } = req.body;
 
    // Verify all referenced documents exist before creating the game
    const referenceError = await validateReferences({ category, publisher, genres, platforms });
    if (referenceError) {
      return res.status(400).json({
        success: false,
        message: referenceError,
      });
    }
 
    const game = await Game.create(req.body);
 
    // Populate references before returning the newly created game
    const populatedGame = await populateGameRefs(Game.findById(game._id));
 
    return res.status(201).json({
      success: true,
      message: 'Game created successfully',
      data: populatedGame,
    });
  } catch (error) {
    // Mongoose schema validation errors (missing/invalid required fields)
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
 
    // Duplicate key error (e.g. unique title/slug constraint)
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A game with this title already exists',
      });
    }
 
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
 
/**
 * @desc    Update a game by ID
 * @route   PUT /api/games/:id
 * @access  Private/Admin
 */
const updateGame = async (req, res) => {
  try {
    const { category, publisher, genres, platforms } = req.body;
 
    // Only validate references that are actually being updated
    const referenceError = await validateReferences({ category, publisher, genres, platforms });
    if (referenceError) {
      return res.status(400).json({
        success: false,
        message: referenceError,
      });
    }
 
    const game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // return the updated document
      runValidators: true, // enforce schema validation on update
    });
 
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }
 
    // Populate references before returning the updated game
    const populatedGame = await populateGameRefs(Game.findById(game._id));
 
    return res.status(200).json({
      success: true,
      message: 'Game updated successfully',
      data: populatedGame,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }
 
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: 'A game with this title already exists',
      });
    }
 
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }
 
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
 
/**
 * @desc    Delete a game by ID
 * @route   DELETE /api/games/:id
 * @access  Private/Admin
 */
const deleteGame = async (req, res) => {
  try {
    const game = await Game.findByIdAndDelete(req.params.id);
 
    if (!game) {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }
 
    return res.status(200).json({
      success: true,
      message: 'Game deleted successfully',
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Game not found',
      });
    }
 
    console.error(error);
    return res.status(500).json({
      success: false,
      message: 'Internal Server Error',
    });
  }
};
 
module.exports = {
  getGames,
  getGameById,
  getGameBySlug,
  createGame,
  updateGame,
  deleteGame,
};
 
