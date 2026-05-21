const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/", auth, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || text.trim() === "") {
      return res.status(400).json({
        error: "Text is required",
      });
    }

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
    });

    const prompt = `
You are an emotional journal analysis assistant.

Analyze the following diary entry and return ONLY valid JSON.

Required JSON format:
{
  "mood": "",
  "sentiment": "",
  "tone": "",
  "emotions": [],
  "insight": ""
}

Diary Entry:
${text}
`;

    const result = await model.generateContent(prompt);

    const response = await result.response;

    const rawText = response.text();

    // Remove markdown wrapping if Gemini returns ```json
    const cleaned = rawText
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let parsed;

try {
  parsed = JSON.parse(cleaned);
} catch {
  parsed = {
    mood: "Unknown",
    sentiment: "Unknown",
    tone: "Unknown",
    emotions: [],
    insight: cleaned,
  };
}

    res.json(parsed);

  } catch (err) {
    console.error("Gemini Analysis Error:", err);

    res.status(500).json({
      error: "Failed to analyze note",
    });
  }
});

module.exports = router;