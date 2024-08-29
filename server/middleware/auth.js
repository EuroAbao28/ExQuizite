const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

// Middleware to verify JWT token
const authenticateToken = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1]; // Bearer token

    if (!token) {
      return res.status(401).json({ message: "Token missing. Please log in." });
    }

    // Verify the token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Find user
    const fetchedUser = await userModel
      .findOne({
        username: decodedToken.username,
      })
      .select("-password")
      .exec(); // Ensure `.exec()` is called for better error handling // parang callback func alternative

    if (!fetchedUser) {
      return res
        .status(404)
        .json({ message: "User not found. Please log in again." });
    }

    // Attach user to request object
    req.user = fetchedUser;
    next(); // Proceed to the next middleware or route handler
  } catch (err) {
    // Handle errors
    console.error("Authentication error:", err);
    res.status(403).json({ message: "Session expired. Please log in again." });
  }
};

module.exports = authenticateToken;
