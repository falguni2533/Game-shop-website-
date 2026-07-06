const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Middleware to protect routes by verifying JWT from HTTP-only cookie
const protect = async (req, res, next) => {
  try {
    // Read the JWT from the HTTP-only cookie
    const token = req.cookies.jwt;

    // If no token is found, deny access
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // Verify the token using the JWT secret
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by decoded ID, excluding the password field
    const user = await User.findById(decoded.id).select("-password");

    // If user no longer exists, deny access
    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    // Attach the user object to the request
    req.user = user;

    // Proceed to the next middleware/controller
    next();
  } catch (error) {
    // Handle invalid or expired tokens
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};

// Export the middleware
module.exports = {
  protect,
};