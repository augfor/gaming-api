const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.route('/').get(controller.all).post(controller.create);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.delete);

module.exports = router;
