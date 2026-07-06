const jwt = require("jsonwebtoken");

// Generate a JWT for a given user ID
const generateToken = (userId) => {
  // Payload contains only the user's ID
  const payload = {
    id: userId,
  };

  // Sign the token using the secret key from environment variables
  // Token will expire in 30 days
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Return the generated token
  return token;
};

// Export the generateToken function
module.exports = generateToken;