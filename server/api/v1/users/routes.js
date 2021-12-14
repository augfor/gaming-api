const express = require('express');

const router = express.Router();

router
  .route('/')
  .get((req, res) => {
    res.json({
      message: 'Get all Users',
    });
  })
  .post((req, res) => {
    res.json({
      message: 'Create a User',
    });
  });

module.exports = router;
