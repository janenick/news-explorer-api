const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const {
  ConflictError, NotFoundError, UnauthError,
} = require('../errors');
const { clientErrorMessage } = require('../utils/errorsMessages');

// контроллер getUserMe находит пользователя по token (возвращает e-mail и имя)
module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError(clientErrorMessage.notFoundUser); })
    .then((user) => res.status(200).send({
      email: user.email,
      name: user.name,
    }))
    .catch(next);
};

// контроллер createUser создает пользователя по переданным e-mail, имя, пароль
module.exports.createUser = (req, res, next) => {
  const {
    email,
    password,
    name,
  } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => User.create({
      email, password: hash, name,
    }))
    .then((user) => res.status(201).send({
      email: user.email,
      name: user.name,
    }))
    .catch((err) => {
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError(clientErrorMessage.conflictUser));
      }
      return next(err);
    });
};

// контроллер login получает из запроса e-mail и пароль и проверяет их
module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res.send({
        token,
      });
    })
    .catch(() => next(new UnauthError(clientErrorMessage.emailOrPasswordError)));
};
