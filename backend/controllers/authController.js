const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/userModel'); // Ensure this path is correct

// Optional: Ensure Mongoose connection here, but it's usually handled in your main app entry
if (!mongoose.connection.readyState) {
  mongoose.connect(process.env.MONGO_URI, { dbName: 'your-db-name' });
}

exports.signup = async (req, res) => {
  if (req.method && req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { username, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'User already exists with this email' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // Prepare payload for JWT
    const payload = {
      id: newUser._id,
      username: newUser.username,
      role: newUser.role,
    };

    // Sign JWT
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: `${process.env.JWT_EXPIRY || '1'}d`,
    });

    res.status(201).json({
      message: 'User registered successfully',
      accessToken: token,
      user: payload,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Signup error' });
  }
};

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
