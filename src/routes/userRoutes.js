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
  getUserInfoSchema,
  updatePasswordSchema,
  updateProfileSchema,
} = require('../middlewares/schemas');
const {
  jsonResponse,
} = require('./shared');

router.get(
  '/:username',
  validateParam(getUserInfoSchema.params),
  verifyAuthToken,
  verifyUser,
  (req, res, next) => jsonResponse(req, res, next, userController.getUserInfo),
);

router.put(
  '/:id/profile',
  validateBody(updateProfileSchema.body),
  verifyAuthToken,
  verifyUser,
  (req, res, next) => jsonResponse(req, res, next, userController.updateUserInfo),
);

router.put(
  '/:username/temp-password',
  validateParam(updatePasswordSchema.params),
  validateBody(updatePasswordSchema.tempPasswordBody),
  verifyAuthToken,
  verifyUser,
  (req, res, next) => jsonResponse(req, res, next, userController.getTemporaryPassword),
);

router.put(
  '/:username/password',
  validateParam(updatePasswordSchema.params),
  validateBody(updatePasswordSchema.updatePasswordBody),
  verifyAuthToken,
  verifyUser,
  (req, res, next) => jsonResponse(req, res, next, userController.updateProfilePassword),
);

module.exports = router;
