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
const { protect, adminOnly } = require("../middlewares/authMiddleware");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/resend-otp", resendOTP);
router.post("/verify-otp", verifyOTP);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);
router.get("/admin", protect, adminOnly, (req, res) => {
  res.json({ message: "Hello Admin" });
});

module.exports = router;
