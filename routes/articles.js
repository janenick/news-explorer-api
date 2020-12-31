const articlesRouter = require('express').Router();
// const { validateCard, validateСardId } = require('../middlewares/celebrateValidation');

const {
  getArticles,
  createArticle,
  deleteArticle,
} = require('../controllers/articles.js');

articlesRouter.get('/', getArticles);

articlesRouter.post('/', createArticle);

articlesRouter.delete('/:cardId', deleteArticle);
/* cardsRouter.post('/', validateCard, createCard);

cardsRouter.delete('/:cardId', validateСardId, deleteCard);
*/

module.exports = articlesRouter;
