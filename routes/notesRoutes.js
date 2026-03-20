const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const noteController = require("../controllers/noteController");

// ✅ ROUTES
router.post("/", auth, noteController.createNote);
router.get("/", auth, noteController.getNotes);
router.put("/:id", auth, noteController.updateNote);
router.delete("/:id", auth, noteController.deleteNote);

// ✅ THIS IS CRITICAL
module.exports = router;