const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  resendOTP,
  verifyOTP,
  forgotPassword,
  resetPassword,
} = require("../controllers/authController");
const isAdmin = require("../middlewares/isAdmin");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/resend-otp", resendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/admin-only-page", isAdmin, (req, res) => {
  res.json({ message: "You are an admin, here's your secret!" });
});

module.exports = router;
