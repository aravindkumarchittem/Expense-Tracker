


const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  title: String,
  amount: Number,
  category: String,
  date: String,
  notes: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 🔐 added
}, { timestamps: true });

module.exports = mongoose.model('Expense', expenseSchema);
