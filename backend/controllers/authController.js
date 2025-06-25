const User = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const existingEmail = await User.findOne({ email });
        const existingUsername = await User.findOne({ username });

        if (existingEmail || existingUsername) {
            return res.status(403).json({ error: 'Username or Email already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, email, password: hashedPassword });
        await user.save();

        const payload = { id: user._id, username: user.username, role: user.role };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY * 24 * 60 * 60 },
            (err, token) => {
                if (err) return res.status(400).json({ error: 'Token generation failed' });

                return res.status(201).json({
                    message: 'Successfully registered new user',
                    accessToken: token,
                    user: payload
                });
            }
        );
    } catch (error) {
        return res.status(500).json({ error: 'Registration error' });
    }
};

exports.login = async (req, res) => {
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

        const payload = { id: existingUser._id, username: existingUser.username, role: existingUser.role };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRY * 24 * 60 * 60 },
            (err, token) => {
                if (err) return res.status(400).json({ error: 'Login failed' });

                return res.status(200).json({
                    message: 'Successfully logged in',
                    accessToken: token,
                    user: payload
                });
            }
        );
    } catch (error) {
        return res.status(500).json({ error: 'Login error' });
    }
};
