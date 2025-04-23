const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
const routes = require("./routes/indexRoute")
const sendEmail = require("./utils/sendEmail");

const requiredEnvVars = [
  "PORT",
  "MONGO_URI",
  "JWT_SECRET",
  "EMAIL_USER",
  "EMAIL_PASS",
];
requiredEnvVars.forEach((varName) => {
  if (!process.env[varName]) {
    throw new Error(`Missing required environment variable: ${varName}`);
  }
});

// Database connection
connectDB();

const app = express();
app.use(express.json());

// Routes
app.use("/api/", routes);

// Test route to check email sending
app.post("/test-email", async (req, res, next) => {
  const { to, subject, text } = req.body;

  try {
    await sendEmail(to, subject, text);
    res.status(200).json({ message: "Email sent successfully!" });
  } catch (err) {
    next(err);
  }
});

// Error handling middleware
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
