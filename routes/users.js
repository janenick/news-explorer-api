const usersRouter = require('express').Router();
const { validateId } = require('../middlewares/celebrateValidation/celebrateValidation');

const {
  getUsers,
  getUserById,
  getUserMe,
} = require('../controllers/users.js');

usersRouter.get('/', getUsers);

usersRouter.get('/me', getUserMe);

usersRouter.get('/:id', validateId, getUserById);

module.exports = usersRouter;
