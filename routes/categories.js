require('dotenv').config();
const express = require("express");
const { getAllCategories, getCategoryById } = require("../models/categoryModel");

const router = express.Router();

// Get all categories

router.get("/", async (req, res) => {
  try {
    const categories = await getAllCategories();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// Get category by id

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const category = await getCategoryById(id);
    res.json(category[0]);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch category" }); 
  }
});

module.exports = router;
