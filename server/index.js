const express = require('express');
const cors = require('cors');

const api = require('./api/v1');
const { logger, requestId, requestLog } = require('./config/logger');
const { cors: corsConfig } = require('./config');

const app = express();

// prettier-ignore
app.use(
  cors({
    origin: corsConfig.origin,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Accept', 'Content-Type', 'Authorization'],
  }),
);

app.use(requestId);

app.use(requestLog);

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

app.use((error, req, res, next) => {
  const { message = '', name = '' } = error;
  let { statusCode = 500 } = error;

  if (name === 'ValidationError') {
    statusCode = 422;

    logger.warn(message);
  } else {
    logger.error(message);
  }

  res.status(statusCode);
  res.json({
    message,
    error,
  });
});

module.exports = app;
