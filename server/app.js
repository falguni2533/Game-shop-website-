const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use("/api/auth", authRoutes);


app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Welcome to the Game Shop API 🚀",
  });
});

module.exports = app;