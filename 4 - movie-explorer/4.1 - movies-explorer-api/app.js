const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { NODE_ENV, MONGODB_URI } = process.env;

const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const {
  MONGODB_DEV_ADDRESS,
  PORT_NUMBER,
} = require('./utils/constants');

const cors = require('./middlewares/cors');
const rateLimiter = require('./middlewares/rateLimit');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const errorHandling = require('./middlewares/errorHandling');
const router = require('./routes/index');

const { PORT = PORT_NUMBER } = process.env;

const app = express();

mongoose.connect(NODE_ENV === 'production' ? MONGODB_URI : MONGODB_DEV_ADDRESS, {
  useNewUrlParser: true,
});

app.use(cors);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);
app.use(helmet());
app.use(rateLimiter);

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use(errorHandling);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
