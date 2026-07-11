const Game = require("../models/Game");
const Category = require("../models/Category");
const Genre = require("../models/Genre");
const Platform = require("../models/Platform");
const Publisher = require("../models/Publisher");
const asyncHandler = require("../middlewares/asyncHandler");

// Fields to populate
const CATEGORY_SELECT = "name slug";
const GENRE_SELECT = "name slug";
const PLATFORM_SELECT = "name slug";
const PUBLISHER_SELECT = "name slug";

/**
 * Validate referenced documents before creating/updating a game.
 */
const validateReferences = async ({
  category,
  publisher,
  genres,
  platforms,
}) => {
  if (category) {
    const categoryExists = await Category.exists({ _id: category });

    if (!categoryExists) {
      throw new Error("Invalid Category");
    }
  }

  if (publisher) {
    const publisherExists = await Publisher.exists({ _id: publisher });

    if (!publisherExists) {
      throw new Error("Invalid Publisher");
    }
  }

  if (genres) {
    const genreList = Array.isArray(genres) ? genres : [genres];

    const genreCount = await Genre.countDocuments({
      _id: { $in: genreList },
    });

    if (genreCount !== genreList.length) {
      throw new Error("Invalid Genre");
    }
  }

  if (platforms) {
    const platformList = Array.isArray(platforms)
      ? platforms
      : [platforms];

    const platformCount = await Platform.countDocuments({
      _id: { $in: platformList },
    });

    if (platformCount !== platformList.length) {
      throw new Error("Invalid Platform");
    }
  }
};

/**
 * Populate all referenced fields.
 */
const populateGameRefs = (query) =>
  query
    .populate("category", CATEGORY_SELECT)
    .populate("genres", GENRE_SELECT)
    .populate("platforms", PLATFORM_SELECT)
    .populate("publisher", PUBLISHER_SELECT);

/* ============================================================
                    GET ALL GAMES
============================================================ */

const getGames = asyncHandler(async (req, res) => {
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

  const filter = {};

  if (search) {
    filter.title = {
      $regex: search,
      $options: "i",
    };
  }

  if (category) filter.category = category;
  if (genre) filter.genres = genre;
  if (platform) filter.platforms = platform;
  if (publisher) filter.publisher = publisher;

  if (featured !== undefined) filter.featured = featured === "true";
  if (trending !== undefined) filter.trending = trending === "true";
  if (bestSeller !== undefined) filter.bestSeller = bestSeller === "true";

  const allowedSortFields = [
    "price",
    "releaseDate",
    "averageRating",
    "createdAt",
  ];

  let sortOption = {
    createdAt: -1,
  };

  if (sort) {
    const sortField = sort.startsWith("-")
      ? sort.substring(1)
      : sort;

    const sortDirection = sort.startsWith("-") ? -1 : 1;

    if (allowedSortFields.includes(sortField)) {
      sortOption = {
        [sortField]: sortDirection,
      };
    }
  }

  const pageNumber = Math.max(parseInt(page, 10) || 1, 1);
  const limitNumber = Math.max(parseInt(limit, 10) || 20, 1);

  const skip = (pageNumber - 1) * limitNumber;

  const [games, totalGames] = await Promise.all([
    populateGameRefs(
      Game.find(filter)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNumber)
    ),
    Game.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    message: "Games fetched successfully",
    pagination: {
      totalGames,
      currentPage: pageNumber,
      totalPages: Math.max(
        Math.ceil(totalGames / limitNumber),
        1
      ),
      limit: limitNumber,
    },
    data: games,
  });
});

/* ============================================================
                    GET GAME BY ID
============================================================ */

const getGameById = asyncHandler(async (req, res) => {
  const game = await populateGameRefs(
    Game.findById(req.params.id)
  );

  if (!game) {
    res.status(404);
    throw new Error("Game not found");
  }

  res.status(200).json({
    success: true,
    message: "Game fetched successfully",
    data: game,
  });
});

/* ============================================================
                    GET GAME BY SLUG
============================================================ */

const getGameBySlug = asyncHandler(async (req, res) => {
  const game = await populateGameRefs(
    Game.findOne({
      slug: req.params.slug,
    })
  );

  if (!game) {
    res.status(404);
    throw new Error("Game not found");
  }

  res.status(200).json({
    success: true,
    message: "Game fetched successfully",
    data: game,
  });
});

/* ============================================================
                    CREATE GAME
============================================================ */

const createGame = asyncHandler(async (req, res) => {
  const { category, publisher, genres, platforms } = req.body;

  await validateReferences({
    category,
    publisher,
    genres,
    platforms,
  });

  const game = await Game.create(req.body);

  const populatedGame = await populateGameRefs(
    Game.findById(game._id)
  );

  res.status(201).json({
    success: true,
    message: "Game created successfully",
    data: populatedGame,
  });
});

/* ============================================================
                    UPDATE GAME
============================================================ */

const updateGame = asyncHandler(async (req, res) => {
  const { category, publisher, genres, platforms } = req.body;

  await validateReferences({
    category,
    publisher,
    genres,
    platforms,
  });

  const game = await Game.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!game) {
    res.status(404);
    throw new Error("Game not found");
  }

  const populatedGame = await populateGameRefs(
    Game.findById(game._id)
  );

  res.status(200).json({
    success: true,
    message: "Game updated successfully",
    data: populatedGame,
  });
});

/* ============================================================
                    DELETE GAME
============================================================ */

const deleteGame = asyncHandler(async (req, res) => {
  const game = await Game.findByIdAndDelete(req.params.id);

  if (!game) {
    res.status(404);
    throw new Error("Game not found");
  }

  res.status(200).json({
    success: true,
    message: "Game deleted successfully",
  });
});

/* ============================================================
                    ADD REVIEW
============================================================ */

const addReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body;

  const game = await Game.findById(req.params.id);

  if (!game) {
    res.status(404);
    throw new Error("Game not found");
  }

  // Check if user has already reviewed this game
  const alreadyReviewed = game.reviews.find(
    (review) => review.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    res.status(400);
    throw new Error("You have already reviewed this game");
  }

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  game.reviews.push(review);

  game.totalReviews = game.reviews.length;

  game.averageRating =
    game.reviews.reduce((acc, item) => acc + item.rating, 0) /
    game.reviews.length;

  await game.save();

  res.status(201).json({
    success: true,
    message: "Review added successfully",
    data: game.reviews,
  });
});

/* ============================================================
                    EXPORT CONTROLLERS
============================================================ */

module.exports = {
  getGames,
  getGameById,
  getGameBySlug,
  createGame,
  updateGame,
  deleteGame,
  addReview,
};