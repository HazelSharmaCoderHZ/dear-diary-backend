const Mood = require("../models/Mood");

// GET moods
exports.getMoods = async (req, res) => {
  try {
    const moods = await Mood.find({ userId: req.user.id });

    const moodMap = {};
    moods.forEach((m) => {
      moodMap[m.date] = m.mood;
    });

    res.json(moodMap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// SET mood
exports.setMood = async (req, res) => {
  try {
    const { date, mood } = req.body;

    const updated = await Mood.findOneAndUpdate(
      { userId: req.user.id, date },
      { mood },
      { upsert: true, new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};