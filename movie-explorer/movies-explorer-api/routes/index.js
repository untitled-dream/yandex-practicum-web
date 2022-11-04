const router = require('express').Router();

const NotFoundError = require('../errors/notFoundError');

const {
  ERROR_MESSAGE: {
    NOT_FOUND,
  },
} = require('../utils/constants');

const {
  validateLogin,
  validateSignup,
} = require('../middlewares/validation');

const {
  login,
  createUser,
} = require('../controllers/user');

const auth = require('../middlewares/auth');

const userRouter = require('./user');
const movieRouter = require('./movie');

router.post('/signin', validateLogin, login);
router.post('/signup', validateSignup, createUser);

router.use(auth, userRouter);
router.use(auth, movieRouter);

router.use('/*', () => {
  throw new NotFoundError(NOT_FOUND);
});

module.exports = router;
