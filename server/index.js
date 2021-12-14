const express = require('express');

const api = require('./api/v1');
const { logger, requestId, requestLog } = require('./config/logger');

const app = express();

// middlewares
app.use(requestId);

app.use(requestLog);

app.use(express.json()); // parse application/json

// API
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
