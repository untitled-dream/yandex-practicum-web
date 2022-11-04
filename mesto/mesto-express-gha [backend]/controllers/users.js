const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const AuthError = require('../errors/authError');
const ConflictError = require('../errors/conflictError');

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

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      res.status(200).send({ data: users });
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

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Запрашиваемый пользователь не найден');
      }
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError('Ошибка при валидации');
      }
      next(err);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (user) {
        throw new ConflictError('Пользователь с таким Email уже зарегистрирован');
      } else {
        bcrypt.hash(req.body.password, 10)
          .then((hash) => User.create({
            name: req.body.name,
            about: req.body.about,
            avatar: req.body.avatar,
            email: req.body.email,
            password: hash,
          }))
          .then((newUser) => {
            res.status(200).send({
              name: newUser.name,
              about: newUser.about,
              avatar: newUser.avatar,
              email: newUser.email,
            });
          })
          .catch((err) => {
            if (err.name === 'ValidationError') {
              throw new BadRequestError('Ошибка при валидации');
            }
            next(err);
          })
          .catch(next);
      }
    })
    .catch(next);
};

module.exports.updateUserData = (req, res, next) => {
  const newNameValue = req.body.name;
  const newAboutValue = req.body.about;

  User.findByIdAndUpdate(
    { _id: req.user._id },
    { name: newNameValue, about: newAboutValue },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(err.message);
      }
      next(err);
    })
    .catch(next);
};

module.exports.updateUserAvatar = (req, res, next) => {
  const newAvatarValue = req.body.avatar;
  User.findByIdAndUpdate(
    { _id: req.user._id },
    { avatar: newAvatarValue },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError('Ошибка при валидации');
      }
      next(err);
    })
    .catch(next);
};
