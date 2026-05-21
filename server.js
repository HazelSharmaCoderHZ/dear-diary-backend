const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
const notesRoutes = require("./routes/notesRoutes");
const moodRoutes = require("./routes/moodRoutes");
const analyzeRoutes = require("./routes/analyzeRoutes");
const app = express();

app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://localhost:3000",
    "https://journaldeardiary-pqsj.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// ✅ ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/notes", notesRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/analyze", analyzeRoutes);
// ✅ TEST
app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err);
  });
