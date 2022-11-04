const mongoose = require('mongoose');

const isURL = require('validator/lib/isURL');
const isLength = require('validator/lib/isLength');

const {
  MOVIE_SCHEMA_MESSAGE,
} = require('../utils/constants');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.REQUIRED.COUNTRY],
    validate: {
      validator(v) {
        return isLength(v, { min: 2, max: 100 });
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_MESSAGE.VALIDATE.COUNTRY}`,
    },
  },
  director: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.REQUIRED.DIRECTOR],
  },
  duration: {
    type: Number,
    required: [true, MOVIE_SCHEMA_MESSAGE.REQUIRED.DURATION],
  },
  year: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.REQUIRED.YEAR],
  },
  description: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.REQUIRED.DESCRIPTION],
  },
  image: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.REQUIRED.IMAGE],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_MESSAGE.VALIDATE.IMAGE}`,
    },
  },
  trailerLink: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.REQUIRED.TRAILER_LINK],
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_MESSAGE.VALIDATE.TRAILER_LINK}`,
    },
  },
  thumbnail: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.REQUIRED.THUMBNAIL],
    default: '',
    validate: {
      validator(v) {
        return isURL(v);
      },
      message: (props) => `${props.value} ${MOVIE_SCHEMA_MESSAGE.VALIDATE.THUMBNAIL}`,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: [true, MOVIE_SCHEMA_MESSAGE.REQUIRED.OWNER],
  },
  movieId: {
    type: Number,
    required: [true, MOVIE_SCHEMA_MESSAGE.REQUIRED.MOVIE_ID],
  },
  nameRU: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.REQUIRED.NAME_RU],
  },
  nameEN: {
    type: String,
    required: [true, MOVIE_SCHEMA_MESSAGE.REQUIRED.NAME_EN],
  },
});

module.exports = mongoose.model('movie', movieSchema);
