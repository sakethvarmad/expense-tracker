require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const expenseRoutes = require("./routes/expenses");

const app = express();
app.use(cors());
app.use(express.json());

// Cache the connection so serverless (Vercel) doesn't reconnect on every request
let connection = null;
async function connectDB() {
  if (connection) return connection;
  connection = mongoose.connect(process.env.MONGODB_URI);
  await connection;
  return connection;
}

app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (err) {
    connection = null;
    console.error("Mongo error:", err.message);
    res.status(500).json({ message: "Database connection failed" });
  }
});

app.get("/", (req, res) => res.json({ status: "Expense Tracker API running" }));
app.use("/api/expenses", expenseRoutes);

const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

module.exports = app;
