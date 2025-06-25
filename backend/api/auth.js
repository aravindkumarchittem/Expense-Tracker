const express = require('express');
const authController = require('../controllers/authController');
const { authLimiter } = require('../middlewares/rateLimiterMiddleware');

const authRouter = express.Router();

authRouter.post('/signup', authLimiter, authController.signup);
authRouter.post('/login', authLimiter, authController.login);

module.exports = authRouter;
