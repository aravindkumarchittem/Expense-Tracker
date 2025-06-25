const express = require('express');
const authRoutes = require('./auth');
const expenseRoutes = require('./expenseRoutes');
const mongoose = require('mongoose');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

app.use(cors());
app.use(express.json());

let isConnected = false;
async function dbConnect() {
  if (isConnected) return;
  await mongoose.connect(process.env.MONGO_URI, {
    dbName: 'your-db-name',
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  isConnected = true;
}

app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);

module.exports = async (req, res) => {
  await dbConnect();
  return serverless(app)(req, res);
};
