const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const logoutController = require('../controllers/logoutController');
const refreshTokenController = require('../controllers/refreshTokenController');
const registerController = require('../controllers/registerController');

const {
  validateBody,
  verifyAuthToken,
} = require('../middlewares');
const {
  authSchema,
} = require('../middlewares/schemas');

const { jsonResponse } = require('./shared');

router.post(
  '/auth',
  validateBody(authSchema.body),
  (req, res, next) => jsonResponse(req, res, next, authController.manageUserLogin),
);

router.get(
  '/logout',
  verifyAuthToken,
  (req, res, next) => jsonResponse(req, res, next, logoutController.manageLogout),
);

router.get(
  '/refresh',
  verifyAuthToken,
  (req, res, next) => jsonResponse(req, res, next, refreshTokenController.manageRefreshToken),
);

router.post(
  '/register',
  validateBody(authSchema.body),
  (req, res, next) => jsonResponse(req, res, next, registerController.manageNewUser),
);

module.exports = router;
