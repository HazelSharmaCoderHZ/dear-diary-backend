const Note = require("../models/Note");

// ✅ CREATE NOTE
exports.createNote = async (req, res) => {
  try {
    const { content, date } = req.body;

    const newNote = new Note({
      userId: req.user.id,
      content,
      date,
    });

    await newNote.save();

    res.status(201).json(newNote);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ GET NOTES
exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
};

// ✅ UPDATE NOTE
exports.updateNote = async (req, res) => {
  try {
    const { content } = req.body;

    const updated = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { content },
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ✅ DELETE NOTE
exports.deleteNote = async (req, res) => {
  try {
    await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};