const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.route('/').get(controller.all).post(controller.create);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .delete(controller.delete);

module.exports = router;
