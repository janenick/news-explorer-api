const rateLimit = require('express-rate-limit');
const { message } = require('../utils/errorsMessages');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { message: message.tooManyRequests },
});

module.exports = { limiter };
