const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const { UnauthError } = require('../errors');
const {
  requiredTrue,
  castTypeMessage,
} = require('../utils/validatonMessages');
const { clientErrorMessage } = require('../utils/errorsMessages');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    cast: castTypeMessage,
    required: requiredTrue,
    validate: {
      validator: (v) => isEmail(v),
      message: clientErrorMessage.incorrectEmail,
    },
  },
  password: {
    type: String,
    cast: castTypeMessage,
    required: requiredTrue,
    minlength: 8,
    // необходимо добавить поле select, чтобы API не возвращал хеш пароля
    select: false,
  },
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    cast: castTypeMessage,
    required: requiredTrue,
    minlength: 2, // минимальная длина имени — 2 символа
    maxlength: 30, // а максимальная — 30 символов
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthError(clientErrorMessage.emailOrPasswordError);
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthError(clientErrorMessage.emailOrPasswordError);
          }

          return user;
        });
    });
}

userSchema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userSchema);
