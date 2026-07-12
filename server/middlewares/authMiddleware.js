const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Protect routes
const protect = async (req, res, next) => {
  try {
    let token;

    // 1. Check Authorization Header (Bearer Token)
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2. If no Bearer Token, check Cookie
    if (!token && req.cookies?.jwt) {
      token = req.cookies.jwt;
    }

    // 3. No token found
    if (!token) {
      return res.status(401).json({
        message: "Not authorized, no token",
      });
    }

    // 4. Verify JWT
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 5. Get user
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    // 6. Attach user to request
    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Not authorized, token failed",
    });
  }
};

module.exports = {
  protect,
};