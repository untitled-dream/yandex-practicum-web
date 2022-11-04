const MONGODB_DEV_ADDRESS = 'mongodb://localhost:27017/moviesdb_dev';
const PORT_NUMBER = 3000;

const ALLOWED_CORS = [
  'https://beat-film.nomoredomains.icu',
  'http://beat-film.nomoredomains.icu',
  'http://localhost:3001',
];

const ERROR_MESSAGE = {
  AUTH_ERROR: 'authorization required',
  FORBIDDEN: 'insufficient rights to perform this action',
  NOT_FOUND: 'the resource can not be found',
  INTERNAL_SERVER_ERROR: 'internal server error',
  BAD_LINK: 'the value is not a URL',
  VALIDATION_ERROR: 'validation error',
  NOT_UNIQUE_EMAIL_VALUE: 'user with this email is already registered',
};

const AUTH_ERROR_WRONG_EMAIL_PASSWORD = 'Wrong email and password';

const USER_SCHEMA_MESSAGE = {
  REQUIRED: {
    EMAIL: 'Field "EMAIL" is required',
    PASSWORD: 'Field "PASSWORD" is required',
    NAME: 'Filed "NAME" is required',
  },
  VALIDATE: {
    EMAIL: '"EMAIL" field value is not an email address',
    PASSWORD: '"PASSWORD" field value is not reliable',
    NAME: '"NAME" field value does not satisfy the conditions - the length of the string is from 2 to 30 characters',
  },
};

const MOVIE_SCHEMA_MESSAGE = {
  REQUIRED: {
    COUNTRY: 'Field "COUNTRY" is required',
    DIRECTOR: 'Field "DIRECTOR" is required',
    DURATION: 'Field "DURATION" is required',
    YEAR: 'Field "YEAR" is required',
    DESCRIPTION: 'Field "DESCRIPTION" is required',
    IMAGE: 'Field "IMAGE" is required',
    TRAILER_LINK: 'Field "TRAILER_LINK" is required',
    THUMBNAIL: 'Field "THUMBNAIL" is required',
    OWNER: 'Field "OWNER" is required',
    MOVIE_ID: 'Field "MOVIE_ID" is required',
    NAME_RU: 'Field "NAME_RU" is required',
    NAME_EN: 'Field "NAME_EN" is required',
  },
  VALIDATE: {
    IMAGE: '"IMAGE" field value is not a URL',
    TRAILER_LINK: 'Field "TRAILER_LINK" is not a URL',
    THUMBNAIL: 'Field "THUMBNAIL" is not a URL',
  },
};

const LOGGER_FILENAME = {
  REQUEST: 'request.log',
  ERROR: 'error.log',
};

module.exports = {
  ERROR_MESSAGE,
  MONGODB_DEV_ADDRESS,
  PORT_NUMBER,
  ALLOWED_CORS,
  AUTH_ERROR_WRONG_EMAIL_PASSWORD,
  USER_SCHEMA_MESSAGE,
  MOVIE_SCHEMA_MESSAGE,
  LOGGER_FILENAME,
};
