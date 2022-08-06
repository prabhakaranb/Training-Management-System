const express = require('express');

const router = express.Router();

const userController = require('../controllers/usersController');
const {
  validateBody,
  verifyAuthToken,
  verifyUser,
  validateParam,
} = require('../middlewares');
const {
  userSchema,
} = require('../middlewares/schemas');
const {
  jsonResponse,
} = require('./shared');

router.get(
  '/:username',
  validateParam(userSchema.params),
  verifyAuthToken,
  verifyUser,
  (req, res, next) => jsonResponse(req, res, next, userController.getUserInfo),
);

router.put(
  '/profile/:id',
  validateBody(userSchema.body),
  verifyAuthToken,
  verifyUser,
  (req, res, next) => jsonResponse(req, res, next, userController.updateUserInfo),
);

module.exports = router;
