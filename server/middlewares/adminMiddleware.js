// Middleware to authorize only admin users
// Assumes the "protect" middleware has already run and attached req.user
const admin = (req, res, next) => {
  try {
    // Check if the user is authenticated and has an admin role
    if (req.user && req.user.role === "admin") {
      // User is an admin, proceed to the next middleware/controller
      return next();
    }

    // User is not an admin, deny access
    return res.status(403).json({ message: "Access denied. Admins only." });
  } catch (error) {
    // Handle unexpected errors
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Export the middleware
module.exports = {
  admin,
};