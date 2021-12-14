const express = require('express');

const api = require('./api/v1');

const app = express();

app.use('/api', api);

app.use((req, res, next) => {
  const statusCode = 404;
  const message = 'Error. Route not found';

  next({
    statusCode,
    message,
  });
});

app.use((err, req, res, next) => {
  const { statusCode = 500, message = '' } = err;

  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
