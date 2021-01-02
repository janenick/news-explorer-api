const Article = require('../models/article');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const { errorHandler } = require('../errors');
const { clientErrorMessage } = require('../utils/errorsMessages');

module.exports.getArticles = (req, res, next) => {
  Article.find({})
    .populate('user')
    .then((articles) => {
      res.send(articles);
    })
    .catch(next);
};

module.exports.createArticle = (req, res, next) => {
  const {
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
  } = req.body;
  Article.create({
    keyword,
    title,
    text,
    date,
    source,
    link,
    image,
    owner: req.user._id,
  })
    .then((article) => res.status(201).send({ article }))
    .catch((err) => next(errorHandler(err, next)));
};

module.exports.deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .orFail(() => { throw new NotFoundError(clientErrorMessage.forbiddenArticle); })
    .then((article) => {
      if (article.owner.toString() === req.user._id) {
        article.remove()
          .then((removeArticle) => res.status(200).send({ data: removeArticle }));
      } else {
        throw new ForbiddenError(clientErrorMessage.forbiddenArticle);
      }
    })
    .catch(next);
};
