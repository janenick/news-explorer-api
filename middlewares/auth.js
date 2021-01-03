const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV, JWT_DEV_SECRET } = require('../config');
const UnauthError = require('../errors/UnauthError');
const { clientErrorMessage } = require('../utils/errorsMessages');

const extractBearerToken = (header) => header.replace('Bearer ', '');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthError(clientErrorMessage.tokenError);
  }

  const token = extractBearerToken(authorization);
  let payload;

  try {
    // попытаемся верифицировать токен
    payload = jwt.verify(token, `${NODE_ENV === 'production' ? JWT_SECRET : JWT_DEV_SECRET}`);
  } catch (err) {
    throw new UnauthError(clientErrorMessage.unauthorized);
  }

  req.user = payload; // записываем пейлоуд в объект запроса

  next(); // пропускаем запрос дальше
};
