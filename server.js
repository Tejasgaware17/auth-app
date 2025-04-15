const express = require("express");
require("dotenv").config();
const sendEmail = require("./utils/sendEmail");

const app = express();

app.use(express.json());


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

// Routes



// Error handling middleware
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
