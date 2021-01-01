const articlesRouter = require('express').Router();
const { validateArticleId } = require('../middlewares/celebrateValidation');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles.js');

articlesRouter.get('/', getArticles);

articlesRouter.post('/', createArticle);

articlesRouter.delete('/:articleId', validateArticleId, deleteArticle);
/* cardsRouter.post('/', validateCard, createCard);

*/

module.exports = articlesRouter;
