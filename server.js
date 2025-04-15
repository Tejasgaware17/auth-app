const express = require("express");
require("dotenv").config();
const sendEmail = require("./utils/sendEmail");

const app = express();

app.use(express.json());


// Routes



// Error handling middleware
const { notFound, errorHandler } = require("./middlewares/errorMiddleware");
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
