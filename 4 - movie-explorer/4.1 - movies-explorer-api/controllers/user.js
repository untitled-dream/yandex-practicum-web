const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const BadRequestError = require('../errors/badRequestError');
const AuthError = require('../errors/authError');
const ConflictError = require('../errors/conflictError');

const {
  ERROR_MESSAGE: {
    VALIDATION_ERROR,
    NOT_UNIQUE_EMAIL_VALUE,
  },
} = require('../utils/constants');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const { NODE_ENV, JWT_SECRET } = process.env;
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'secret-key',
        { expiresIn: '7d' },
      );

      res.send({ token });
    })
    .catch((err) => {
      throw new AuthError(err.message);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throw new ConflictError(NOT_UNIQUE_EMAIL_VALUE);
      } else {
        bcrypt.hash(req.body.password, 10)
          .then((hash) => User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash,
          }))
          .then((newUser) => {
            res.status(201).send({
              name: newUser.name,
              email: newUser.email,
            });
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              throw new BadRequestError(VALIDATION_ERROR);
            }
            next(err);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.status(200).send(user);
    })
    .catch(next);
};

module.exports.updateCurrentUser = (req, res, next) => {
  const newNameValue = req.body.name;
  const newEmailValue = req.body.email;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { email: newEmailValue, name: newNameValue },
    { new: true, runValidators: true },
  )
    .then((currentUser) => {
      res.status(200).send(currentUser);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(VALIDATION_ERROR);
      } else if (err.code === 11000) {
        throw new ConflictError(NOT_UNIQUE_EMAIL_VALUE);
      }
      next(err);
    })
    .catch(next);
};
