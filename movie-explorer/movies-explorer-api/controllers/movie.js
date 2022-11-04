const Movie = require('../models/movie');

const NotFoundError = require('../errors/notFoundError');
const BadRequestError = require('../errors/badRequestError');
const ForbiddenError = require('../errors/forbiddenError');

const {
  ERROR_MESSAGE: {
    FORBIDDEN,
    NOT_FOUND,
    VALIDATION_ERROR,
  },
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;

  Movie.find({ owner })
    .then((movies) => {
      res.status(200).send(movies);
    })
    .catch(() => {
      throw new NotFoundError(NOT_FOUND);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const owner = req.user._id;
  Movie.create({ owner, ...req.body })
    .then((movie) => {
      res.status(201).send(movie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        throw new BadRequestError(VALIDATION_ERROR);
      }
      next(err);
    })
    .catch(next);
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { _id } = req.params;

  Movie.findById(_id)
    .then((movie) => {
      if (!movie) {
        throw new NotFoundError(NOT_FOUND);
      }
      if (movie.owner.toString() !== owner) {
        throw new ForbiddenError(FORBIDDEN);
      } else {
        Movie.findByIdAndDelete(_id)
          .then((deletedMovie) => {
            res.status(200).send(deletedMovie);
          })
          .catch(next);
      }
    })
    .catch(next);
};
