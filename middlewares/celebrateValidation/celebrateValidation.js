const { celebrate, Joi } = require('celebrate');

const validateArticle = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required().min(3),
    title: Joi.string().required().min(3),
    text: Joi.string().required().min(3),
    date: Joi.string().required().min(10),
    source: Joi.string().required().min(3),
    link: Joi.string().uri().required(),
    image: Joi.string().pattern(/^(https?:\/\/(www\.)?)[\w-]+\.[\w./():,-]+#?$/).required(),
  }).unknown(true),
});

const validateArticleId = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().hex().length(24),
  }),
});

const validateUser = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const validateUserRegister = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(8),
    name: Joi.string().min(2).max(30),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().alphanum().hex().length(24),
  }),
});

module.exports = {
  validateArticle,
  validateArticleId,
  validateUser,
  validateUserRegister,
  validateId,
};
