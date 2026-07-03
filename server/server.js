require("dotenv").config();

const app = require("./app");

const PORT = process.env.PORT || 5000;

// Test Route
app.get("/", (req, res) => {
  res.send("🚀 Game Shop Backend is Running!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});