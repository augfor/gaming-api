const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send({
    message: 'Welcome to the gaming API',
  });
});

module.exports = app;
