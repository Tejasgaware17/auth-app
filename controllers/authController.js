const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("../models/User");
const sendEmail = require("../utils/sendEmail");
const asyncHandler = require("express-async-handler");
const { error } = require("console");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register new user
exports.registerUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const password = req.body.password?.toString();

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400);
    throw new Error("User already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  await User.create({ email, password: hashedPassword });

  res.status(201).json({ message: "Registered successfully!" });
});

// Login and send OTP
exports.loginUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const password = req.body.password?.toString();

  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    res.status(400);
    throw new Error("Invalid email or password");
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const otpExpires = new Date(Date.now() + 5 * 60 * 1000); // 5 mins

  user.otp = otp;
  user.otpExpires = otpExpires;
  await user.save();

  await sendEmail(user.email, "Your OTP Code", `Your OTP is: ${otp}`);

  res.status(200).json({ message: "OTP sent to email!" });
});

// Verify OTP
exports.verifyOTP = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const otp = req.body.otp?.toString();

  const user = await User.findOne({ email });
  if (!user || user.otp !== otp || user.otpExpires < Date.now()) {
    res.status(400);
    throw new Error("Invalid or expired OTP");
  }

  if (user.isVerified) {
    res.status(400);
    throw new Error("User already verified.");
  }

  user.otp = undefined;
  user.otpExpires = undefined;
  user.isVerified = true;
  await user.save();

  const token = generateToken(user._id);
  res.status(200).json({ message: "Login successful!", token });
});

// Forgot password
exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User with that email does not exists");
  }

  const resetToken = crypto.randomBytes(32).toString("hex");
  const resetTokenHashed = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  user.resetPasswordToken = resetTokenHashed;
  user.resetPasswordExpires = Date.now() + 10 * 60 * 1000; // 10 mins
  await user.save();

  const resetURL = `${req.protocol}://${req.get("host")}/api/auth/reset-password/${resetToken}`;
  const resetMessage = `Reset your password with this link:\n${resetURL}\n\nThis link will expire in 10 minutes. Do not share this link anywhere.`;

  await sendEmail(user.email, "Password reset request", resetMessage);

  res.status(200).json({ message: "Reset link sent to email" });
});

// Reset password
exports.resetPassword = asyncHandler(async (req, res) => {
  const resetTokenHashed = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken: resetTokenHashed,
    resetPasswordExpires: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Invalid or expired token");
  }

  const password = req.body;

  if (!password) {
    res.status(400);
    throw new Error("Password is required");
  }

  const passwordHashed = await bcrypt.hash(password.toString(), 10);
  user.password = passwordHashed;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.status(200).json({ message: "Password reset successful!" });
});
