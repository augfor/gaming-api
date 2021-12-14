const express = require('express');

const controller = require('./controller');

const router = express.Router();

router.route('/').get(controller.all);

router.route('/signin').get(controller.all).post(controller.signin);

router.route('/signup').get(controller.all).post(controller.signup);

router.param('id', controller.id);

router
  .route('/:id')
  .get(controller.read)
  .put(controller.update)
  .patch(controller.update)
  .delete(controller.delete);

module.exports = router;
