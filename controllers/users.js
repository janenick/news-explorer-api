const bcrypt = require('bcryptjs'); // импортируем bcrypt
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const UnauthError = require('../errors/UnauthError');
const ConflictError = require('../errors/ConflictError');
const { errorHandler } = require('../errors');
const { clientErrorMessage } = require('../utils/errorsMessages');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => { throw new NotFoundError(clientErrorMessage.notFoundUser); })
    .then((user) => res.status(200).send(user))
    .catch(next);
};

// контроллер getUserMe находит пользователя по token
module.exports.getUserMe = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => { throw new NotFoundError(clientErrorMessage.notFoundUser); })
    .then((user) => res.status(200).send(user))
    .catch((err) => errorHandler(err, next));
};

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
        next(new ConflictError(clientErrorMessage.conflictUser));
      } else {
        next(errorHandler(err, next));
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      console.log('JWT_SECRET=', JWT_SECRET);
      res.send({
        token,
      });
    })
    .catch(() => next(new UnauthError(clientErrorMessage.emailOrPasswordError)));
};
