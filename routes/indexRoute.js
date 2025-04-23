const express = require("express");
const router = express.Router();

const authRoutes = require("./auth");
const protectedRoutes = require("./protectedRoutes");

router.use("/auth", authRoutes);
router.use("/protected", protectedRoutes);

module.exports = router;
