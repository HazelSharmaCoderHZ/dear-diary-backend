const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const {
  getMoods,
  setMood,
} = require("../controllers/moodController");

// ✅ GET moods
router.get("/", auth, getMoods);

// ✅ SET mood
router.post("/", auth, setMood);

module.exports = router;