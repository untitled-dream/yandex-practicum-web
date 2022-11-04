const usersRouter = require('express').Router();

const {
  validateId,
  validateUpdateCurrentUser,
} = require('../middlewares/validation');

const {
  getCurrentUser,
  updateCurrentUser,
} = require('../controllers/user');

usersRouter.get('/users/me', validateId, getCurrentUser);
usersRouter.patch('/users/me', validateUpdateCurrentUser, updateCurrentUser);

module.exports = usersRouter;
