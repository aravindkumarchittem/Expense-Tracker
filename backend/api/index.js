const express = require('express');
const authRoutes = require('./auth');
const expenseRoutes = require('./expenseRoutes');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  dbName: 'your-db-name',
});

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

// ✅ Export Vercel-compatible handler
const serverless = require('serverless-http');
module.exports = serverless(app);
