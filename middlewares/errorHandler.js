const { serverErrorMessage, clientErrorMessage } = require('../utils/errorsMessages');

const errorHandler = (err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const error = {
    statusCode: err.statusCode || 500,
    message: err.message || serverErrorMessage.serverError,
  };

  if (err.name === 'ValidationError') {
    error.statusCode = 400;
    error.message = err.message;
  }
  if (err.name === 'CastError') {
    error.statusCode = 422;
    error.message = clientErrorMessage.castError;
  }
  if (err.name === 'DisconnectedError') {
    error.statusCode = 503;
    error.message = serverErrorMessage.disconnectedError;
  }
  res.status(error.statusCode).send({ message: error.message });
  next();
};

module.exports = errorHandler;
