const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    amount: { type: Number, required: [true, "Amount is required"], min: [0.01, "Amount must be positive"] },
    category: {
      type: String,
      enum: ["Food", "Transport", "Shopping", "Bills", "Health", "Other"],
      default: "Other",
    },
    date: { type: Date, default: Date.now },
    note: { type: String, trim: true, default: "" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Expense", expenseSchema);
