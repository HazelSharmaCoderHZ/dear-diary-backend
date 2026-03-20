const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");


const app = express();

app.use(cors());
app.use(express.json());

// ✅ IMPORT ROUTES
const notesRoutes = require("./routes/notesRoutes");
const moodRoutes = require("./routes/moodRoutes");

// 🔥 DEBUG
console.log("NOTES:", typeof notesRoutes);
console.log("MOODS:", typeof moodRoutes);

// ✅ USE ROUTES
app.use("/api/notes", notesRoutes);
app.use("/api/moods", moodRoutes);
app.use("/api/auth", authRoutes);
// ✅ TEST ROUTE
app.get("/", (req, res) => {
  res.send("API running...");
});

// ✅ DB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ✅ START
app.listen(5000, () => console.log("Server running on port 5000"));