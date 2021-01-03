// для вывода ошибки в JSON формате

const { isCelebrateError } = require('celebrate');
const BadRequestError = require('../../errors/BadRequestError');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const customError = err.details.get('body') || err.details.get('params');
    throw new BadRequestError(customError.message.replace(/"/g, ''));
  }
  return next(err);
};
