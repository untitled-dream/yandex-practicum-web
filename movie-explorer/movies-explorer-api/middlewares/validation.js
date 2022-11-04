const { celebrate, Joi, CelebrateError } = require('celebrate');

const isURL = require('validator/lib/isURL');
const isEmail = require('validator/lib/isEmail');

const {
  ERROR_MESSAGE: {
    BAD_LINK, VALIDATION_ERROR,
  },
} = require('../utils/constants');

const URLValidator = (value) => {
  if (!isURL(value)) {
    throw new CelebrateError(`${BAD_LINK}`);
  }
  return value;
};

const emailValidator = (value) => {
  if (!isEmail(value)) {
    throw new CelebrateError(`${VALIDATION_ERROR}`);
  }
  return value;
};

module.exports.validateId = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().alphanum().length(24).hex(),
  }),
});

module.exports.validateUpdateCurrentUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().custom(emailValidator),
  }),
});

module.exports.validateCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().min(1).max(100),
    director: Joi.string().required().min(1).max(100),
    duration: Joi.number().required(),
    year: Joi.string().required().min(2).max(4),
    description: Joi.string().required().min(1).max(5000),
    nameRU: Joi.string().required().min(1).max(100),
    nameEN: Joi.string().required().min(1).max(100),
    image: Joi.string().required().custom(URLValidator),
    trailerLink: Joi.string().required().custom(URLValidator),
    thumbnail: Joi.string().required().custom(URLValidator),
    movieId: Joi.number().required(),
  }),
});

module.exports.validateDeleteMovie = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().alphanum().length(24)
      .hex(),
  }),
});

module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(emailValidator),
    password: Joi.string().required().min(8).max(30),
  }),
});

module.exports.validateSignup = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(emailValidator),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
});
