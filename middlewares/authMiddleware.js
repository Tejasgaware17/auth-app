const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

const protect = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    res.status(401);
    throw new Error("Not authorized!, no token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findOne({ _id: decoded.id }).select("-password");

    if (!req.user) {
      res.status(401);
      throw new Error("User not found!");
    }

    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized!, invalid token");
  }
});

// Admin only access
const adminOnly = asyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403);
    throw new Error("Access denied!, only admin allowed to access this route.");
  }
});

module.exports = { protect, adminOnly };
