const db = require("../config/database");

const getAllCategories = async () => {
  const [rows] = await db.execute("SELECT * FROM categories");
  return rows;
};

const getCategoryById = async (id) => {
  const [rows] = await db.execute("SELECT name FROM categories WHERE id = ?", [id]);
  return rows;
};

module.exports = { getAllCategories, getCategoryById };
