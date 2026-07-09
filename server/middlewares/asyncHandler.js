
//  * asyncHandler.js
//  * ----------------
//  * A reusable higher-order function (HOF) that wraps asynchronous
//  * Express controller functions (route handlers).
//  *
//  * PURPOSE:
//  * Express does NOT automatically catch errors thrown inside async
//  * functions. If an awaited promise rejects (e.g. a failed DB query)
//  * and you forget a try...catch, the request hangs and the error
//  * never reaches your error-handling middleware.
//  *
//  * asyncHandler solves this by automatically catching any error
//  * and forwarding it to Express's error-handling middleware via next(error).
//  *
//  * USAGE:
//  * const asyncHandler = require('../middleware/asyncHandler');
//  *
//  * const getProduct = asyncHandler(async (req, res, next) => {
//  *   const product = await Product.findById(req.params.id);
//  *   res.json(product);
//  * });
//  */
 
/**
 * asyncHandler
 * @param {Function} fn - The async controller function (req, res, next) => {}
 * @returns {Function} - A new Express middleware function with built-in error handling
 */
const asyncHandler = (fn) => {
  // Return a new function that Express will actually call for every request.
  // Express calls this returned function with (req, res, next) automatically.
  return (req, res, next) => {
    // Promise.resolve() ensures that even if `fn` is a normal (non-async)
    // function that happens to throw synchronously, or returns a non-promise
    // value, it is safely wrapped into a Promise chain so `.catch()` works.
    Promise.resolve(fn(req, res, next)).catch((error) => {
      // If the promise rejects (i.e., an error occurred anywhere inside
      // the controller — DB error, validation error, etc.), we forward
      // that error to Express's next() function.
      // Express recognizes that an argument was passed to next()
      // and automatically skips all normal middleware, routing
      // the request straight to the error-handling middleware.
      next(error);
    });
  };
};
 
// Export using CommonJS so it can be imported with require() elsewhere.
module.exports = asyncHandler;