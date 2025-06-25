const express = require('express');
const authRoutes = require('./api/auth');
const expenseRoutes = require('./api/expenseRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      dbName: 'your-db-name'
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Use a middleware to ensure DB connection before handling any route
app.use(async (req, res, next) => {
  try {
    await dbConnect();
    next();
  } catch (err) {
    console.error('DB connection error:', err);
    res.status(500).json({ message: 'Database connection error', error: err.message });
  }
});

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

module.exports = serverless(app);
