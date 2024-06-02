require('dotenv').config();
const express = require("express");
const cors = require("cors");
const db = require("./config/database");
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const categoryRoutes = require("./routes/categories");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);
app.use("/api/categories", categoryRoutes);

const PORT = process.env.PORT || 5000;

db.getConnection()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
