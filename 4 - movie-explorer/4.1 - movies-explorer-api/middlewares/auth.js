const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const AuthError = require('../errors/authError');

const {
  ERROR_MESSAGE: {
    AUTH_ERROR,
  },
} = require('../utils/constants');

module.exports = (req, res, next) => {
  let payload;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(AUTH_ERROR);
  }

  const token = authorization.replace('Bearer ', '');

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret-key');
  } catch (err) {
    throw new AuthError(AUTH_ERROR);
  }

  req.user = payload;

  return next();
};
