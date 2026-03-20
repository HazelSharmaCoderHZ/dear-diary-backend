const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    mood: {
      type: String,
      enum: ["good", "average", "bad"],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Mood", moodSchema);