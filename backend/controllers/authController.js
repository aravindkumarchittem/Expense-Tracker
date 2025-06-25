const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModel'); // make sure path is correct

// Ensure Mongoose connection (optional, handled in main entry usually)
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI, { dbName: 'your-db-name' });
}

exports.login = async (req, res) => {
  if (req.method && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const payload = {
      id: existingUser._id,
      username: existingUser.username,
      role: existingUser.role,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRY || '1'}d`,
    });

    return res.status(200).json({
      message: 'Successfully logged in',
      accessToken: token,
      user: payload,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Login error' });
  }
};
