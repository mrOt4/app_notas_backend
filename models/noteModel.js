const db = require("../config/database");

const createNote = async (
  title,
  content,
  category_id,
  user_id,
  is_public = false,
  image_url = null
) => {
  const [result] = await db.execute(
    "INSERT INTO notes (title, content, category_id, user_id, is_public, image_url) VALUES (?, ?, ?, ?, ?, ?)",
    [title, content, category_id, user_id, is_public, image_url]
  );
  return result;
};

const getUserNotes = async (user_id) => {
  const [rows] = await db.execute(
    "SELECT id, title FROM notes WHERE user_id = ?",
    [user_id]
  );
  return rows;
};

const getNoteById = async (id) => {
  const [rows] = await db.execute("SELECT * FROM notes WHERE id = ?", [id]);
  return rows[0];
};

const updateNote = async (
  id,
  title,
  content,
  category_id  
) => {
  const [result] = await db.execute(
    "UPDATE notes SET title = ?, content = ?, category_id = ? WHERE id = ?",
    [title, content, category_id, id]
  );
  return result;
};

const deleteNote = async (id) => {
  const [result] = await db.execute("DELETE FROM notes WHERE id = ?", [id]);
  return result;
};

module.exports = {
  createNote,
  getUserNotes,
  getNoteById,
  updateNote,
  deleteNote,
};
