const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const isAdmin = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith == "Bearer") {
    res.status(401);
    throw new Error("User not Authorized, No token");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user || user.role != "admin") {
      res.status(403);
      throw new Error("Access restricted! Only admin allowed to access");
    }

    res.user = user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error("Not authorized, token failed!");
  }
});

module.exports = isAdmin;
