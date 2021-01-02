const rateLimit = require('express-rate-limit');
const { clientErrorMessage } = require('../utils/errorsMessages');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 минут
  max: 100,
  message: clientErrorMessage.tooManyRequests,
});

module.exports = { limiter };
