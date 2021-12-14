const express = require('express');
const morgan = require('morgan');
const { v4: uuidv4 } = require('uuid');

const api = require('./api/v1');
const logger = require('./config/logger');

const app = express();

app.use((req, res, next) => {
  res.setHeader('X-Request-Id', uuidv4());

  next();
});

// prettier-ignore
app.use(
  morgan('combined', {
    stream: {
      write: (message) => logger.info(message),
    },
  }),
);

app.use(express.json());

app.use('/api', api);

app.use((req, res, next) => {
  const statusCode = 404;
  const message = 'Error. Route not found';

  logger.warn(message);

  next({
    statusCode,
    message,
  });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = '' } = err;

  logger.error(message);

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
