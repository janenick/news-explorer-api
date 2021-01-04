// для вывода ошибки в JSON формате
const { isCelebrateError } = require('celebrate');
const { clientErrorMessage } = require('../../utils/errorsMessages');

module.exports = (err, req, res, next) => {
  if (isCelebrateError(err)) {
    const customError = err.details.get('body') || err.details.get('params');

    res.status(400).send({
      message: `${clientErrorMessage.validationError}: ${customError.message.replace(/"/g, '')}`,
    });
  }
  next(err);
};
