const mongoose = require('mongoose');
const { urlRegEx } = require('../config');

const {
  requiredTrue,
  linkErrorMessage,
  castTypeMessage,
} = require('../utils/validatonMessages');

const articleSchema = new mongoose.Schema({
  keyword: {
    type: String,
    cast: castTypeMessage,
    required: requiredTrue,
  },
  title: {
    type: String,
    cast: castTypeMessage,
    required: requiredTrue,
  },
  text: {
    type: String,
    cast: castTypeMessage,
    required: requiredTrue,
  },
  date: {
    type: String,
    cast: castTypeMessage,
    required: requiredTrue,
  },
  source: {
    type: String,
    cast: castTypeMessage,
    required: requiredTrue,
  },
  link: {
    type: String,
    cast: castTypeMessage,
    required: requiredTrue,
    validate: {
      validator(v) {
        return urlRegEx.test(v);
      },
      message: linkErrorMessage, // когда validator вернёт false, будет использовано это сообщение
    },
  },
  image: {
    type: String,
    cast: castTypeMessage,
    required: requiredTrue,
    validate: { // опишем свойство validate
      validator(v) {
        return urlRegEx.test(v);
      },
      message: linkErrorMessage, // когда validator вернёт false, будет использовано это сообщение
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    cast: castTypeMessage,
    required: requiredTrue,
    select: false,
  },
});

module.exports = mongoose.model('article', articleSchema);
