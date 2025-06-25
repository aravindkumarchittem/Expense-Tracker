
const express = require('express');
const Expense = require('../models/Expense');
const router = express.Router();
// const { authenticate } = require('../middlewares/authMiddleware');
const { authenticate } = require('../middlewares/authMiddleware');


router.use(authenticate);

router.post('/', async (req, res) => {
  try {
    const newExpense = new Expense({
      ...req.body,
      userId: req.user, 
    });
    const saved = await newExpense.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find({ userId: req.user }).sort({ date: -1 });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user },
      { ...req.body, updatedAt: new Date() },
      { new: true }
    );

    if (!expense) {
      return res.status(404).json({ error: 'Expense not found or unauthorized' });
    }

    res.json(expense);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({ _id: req.params.id, userId: req.user });

    if (!deleted) {
      return res.status(404).json({ error: 'Expense not found or unauthorized' });
    }

    res.json({ message: 'Expense deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;

