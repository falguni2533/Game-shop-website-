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
 
/**
 * errorHandler
 * @param {Error} err   - The error object forwarded via next(error)
 * @param {Object} req  - Express request object
 * @param {Object} res  - Express response object
 * @param {Function} next - Express next function (required for Express
 *                          to recognize this as error-handling middleware,
 *                          even though it isn't called here)
 */
const errorHandler = (err, req, res, next) => {
  // Sometimes an error occurs after res.statusCode was already set to 200
  // (the default success code) by Express before the error was thrown.
  // In that case, override it to 500 (Internal Server Error).
  // Otherwise, respect whatever status code was already set
  // (e.g., a controller may have set 404 before throwing "Not Found").
  void next; // eslint-disable-line no-unused-vars
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
 
  // Explicitly set the response status code.
  res.status(statusCode);
 
  // Send a consistent, structured JSON error response to the client.
  res.json({
    // Always false, so the frontend can reliably check `if (!data.success)`.
    success: false,
 
    // Human-readable error message. Falls back to a generic message
    // if the error object doesn't have one.
    message: err.message || 'Internal Server Error',
 
    // Only expose the stack trace during development/debugging.
    // In production, hide internal implementation details from
    // clients for security reasons — return null instead.
    stack: process.env.NODE_ENV !== 'production' ? err.stack : null,
  });
};
 
// Export using CommonJS so it can be imported with require() elsewhere.
module.exports = errorHandler;
