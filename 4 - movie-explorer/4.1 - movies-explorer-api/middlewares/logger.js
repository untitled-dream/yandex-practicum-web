const winston = require('winston');
const expressWinston = require('express-winston');

const {
  LOGGER_FILENAME: {
    REQUEST,
    ERROR,
  },
} = require('../utils/constants');

module.exports.requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: REQUEST }),
  ],
  format: winston.format.json(),
});

module.exports.errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: ERROR }),
  ],
  format: winston.format.json(),
});
