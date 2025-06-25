const rateLimit = require('express-rate-limit');

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5,
  message: {
    success: false,
    message: 'Too many attempts, please try again after some time.'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = { authLimiter };
