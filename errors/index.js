const { clientErrorMessage } = require('../utils/errorsMessages');
const NotFoundError = require('./NotFoundError');
const ValidationError = require('./ValidationError');
const DisconnectedError = require('./DisconnectedError');

module.exports.errorHandler = (err, next) => {
  if (err.kind === 'ObjectId') {
    next(new ValidationError(clientErrorMessage.incorrectId));
  } else if (err.statusCode === 404) {
    next(new NotFoundError(clientErrorMessage.notFoundObject));
  } else if (err.name === 'ValidationError') {
    const errorTexts = Object.values(err.errors).map((error) => error.message).join(', ');
    next(new ValidationError(errorTexts));
  } else if (err.name === 'ValidatorError') {
    next(new ValidationError(clientErrorMessage.validationError));
  } else if (err.name === 'CastError') {
    next(new ValidationError(`${clientErrorMessage.renovationError} : ${err.message}`));
  } else if (err.name === 'DisconnectedError') {
    next(new DisconnectedError(clientErrorMessage.disconnectedError));
  } else {
    next(err);
  }
};
