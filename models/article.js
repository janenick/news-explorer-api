const mongoose = require('mongoose');
const validate = require('validator');

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
    minlength: 3,
  },
  title: {
    type: String,
    cast: castTypeMessage,
    required: requiredTrue,
    minlength: 3,
  },
  text: {
    type: String,
    cast: castTypeMessage,
    required: requiredTrue,
    minlength: 3,
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
        return validate.isURL(v);
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
        return /^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/.test(v);
      },
      message: linkErrorMessage, // когда validator вернёт false, будет использовано это сообщение
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    cast: castTypeMessage,
    required: requiredTrue,
  },
});

module.exports = mongoose.model('article', articleSchema);
