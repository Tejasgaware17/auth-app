const express = require("express");
const router = express.Router();
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.get("/user-dashboard", protect, (req, res) => {
  console.log("user");
  res.json({ message: `Welcome, ${req.user.email}!`, user: req.user });
});

router.get("/admin-dashboard", protect, adminOnly, (req, res) => {
  console.log("admin");

  res.json({ message: `Welcome Admin: ${req.user.email}` });
});

module.exports = router;
