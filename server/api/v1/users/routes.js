const express = require('express');

const controller = require('./controller');
const { auth } = require('../auth');

const router = express.Router();

router.route('/').get(controller.all);

router.route('/login').post(controller.login);

router.route('/signup').post(controller.signup);

router
  .route('/profile')
  .get(auth, controller.profile)
  .put(auth, controller.update)
  .patch(auth, controller.update)
  .delete(auth, controller.delete);

router.param('id', controller.id);

router.route('/:id').get(auth, controller.read);

module.exports = router;
