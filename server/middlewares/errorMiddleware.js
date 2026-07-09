/**
 * errorHandler.js
 * ----------------
 * Global Express error-handling middleware.
 *
 * Express identifies error-handling middleware by its signature:
 * it MUST have exactly four parameters -> (err, req, res, next).
 * When any route/middleware calls next(error), Express skips all
 * normal middleware and routing logic and jumps straight here.
 *
 * This should be registered LAST in app.js/server.js, after all
 * routes have been mounted, so it can catch errors from anywhere
 * in the request lifecycle.
 *
 * USAGE (in app.js):
 * const errorHandler = require('./middleware/errorHandler');
 * app.use('/api/products', productRoutes);
 * app.use(errorHandler); // must come after all routes
 */

const errorHandler = (err, req, res, next) => {
  // Express requires the 'next' parameter for error middleware
  // even if it isn't used.
  void next;

  // If no status code has been set, default to 500.
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  // Handle invalid MongoDB ObjectId
  if (err.name === "CastError") {
    statusCode = 404;
    err.message = "Resource not found";
  }

  // Handle Mongoose validation errors
  if (err.name === "ValidationError") {
    statusCode = 400;
    err.message = Object.values(err.errors)
      .map((error) => error.message)
      .join(", ");
  }

  // Handle duplicate key errors (unique fields)
  if (err.code === 11000) {
    statusCode = 409;
    err.message = "Duplicate field value entered";
  }

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack:
      process.env.NODE_ENV === "production"
        ? null
        : err.stack,
  });
};

module.exports = errorHandler;