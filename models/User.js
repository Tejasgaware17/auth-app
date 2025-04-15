const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  otp: String,
  otpExpires: Date,
  role: { type: String, default: "user" },
});

module.exports = mongoose.model("User", userSchema);
