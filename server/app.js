
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const gameRoutes = require("./routes/gameRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const genreRoutes = require("./routes/genreRoutes");
const platformRoutes = require("./routes/platformRoutes");
const publisherRoutes = require("./routes/publisherRoutes");

const errorHandler = require("./middlewares/errorMiddleware");

const app = express();


app.use(express.json()); //middleware to parse incoming JSON requests

app.use(express.urlencoded({ extended: true }));

// Enable CORS
app.use(cors())

// Authentication Routes
app.use("/api/auth", authRoutes);

// Game Routes
app.use("/api/games", gameRoutes);

// Category Routes
app.use("/api/categories", categoryRoutes);

// Genre Routes
app.use("/api/genres", genreRoutes);

// Platform Routes
app.use("/api/platforms", platformRoutes);

// Publisher Routes
app.use("/api/publishers", publisherRoutes);


app.get("/", (req, res) => { // Home route
  res.status(200).json({
    success: true,
    message: "🎮 Welcome to Game Shop API",
  });
});


 app.use((req, res) => {   //404route handler
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorHandler); // Global error handling middleware

module.exports = app;