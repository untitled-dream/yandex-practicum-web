const movieRouter = require('express').Router();

const {
  validateCreateMovie,
  validateDeleteMovie,
} = require('../middlewares/validation');

const {
  getMovies,
  createMovie,
  deleteMovie,
} = require('../controllers/movie');

movieRouter.get('/movies', getMovies);
movieRouter.post('/movies', validateCreateMovie, createMovie);
movieRouter.delete('/movies/:_id', validateDeleteMovie, deleteMovie);

module.exports = movieRouter;
