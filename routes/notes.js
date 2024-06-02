require('dotenv').config();
const express = require("express");
const {
  createNote,
  getUserNotes,
  getNoteById,
  updateNote,
  deleteNote,
} = require("../models/noteModel");
const { verifyToken } = require("../middleware/auth");

const router = express.Router();

// Create a note
router.post("/", verifyToken, async (req, res) => {
  const { title, content, category_id, is_public, image_url } = req.body;
  const user_id = req.user.id;
  try {
    await createNote(
      title,
      content,
      category_id,
      user_id,
      is_public,
      image_url
    );
    res.status(201).json({ message: "Note created" });
  } catch (error) {
    res.status(400).json({ error: "Failed to create note" });
  }
});

// Get all notes for a user
router.get("/", verifyToken, async (req, res) => {
  const user_id = req.user.id;
  try {
    const notes = await getUserNotes(user_id);
    res.json(notes);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});

// Get a note by ID
router.get("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const note = await getNoteById(id);
    if (note.user_id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    res.json(note);
  } catch (error) {
    res.status(404).json({ error: "Note not found" });
  }
});

// Update a note
router.put("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, content, category_id } = req.body;
  try {
    const note = await getNoteById(id);
    if (note.user_id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await updateNote(id, title, content, category_id );
    res.json({ message: "Note updated" });
  } catch (error) {
    res.status(400).json({ error: "Failed to update note" });
  }
});

// Delete a note
router.delete("/:id", verifyToken, async (req, res) => {
  const { id } = req.params;
  try {
    const note = await getNoteById(id);
    if (note.user_id !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized" });
    }
    await deleteNote(id);
    res.json({ message: "Note deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete note" });
  }
});

module.exports = router;
