const express = require('express');

const router = express.Router();

const streamController = require('../controllers/streamController');
const { USER_ROLES } = require('../lib/constants/userConstants');
const {
  validateBody,
  verifyAuthToken,
  verifyRoles,
} = require('../middlewares');
const {
  streamSchema,
} = require('../middlewares/schemas');
const {
  jsonResponse,
} = require('./shared');

router.get(
  '/',
  verifyAuthToken,
  verifyRoles(USER_ROLES.ADMIN, USER_ROLES.NON_ADMIN),
  (req, res, next) => jsonResponse(req, res, next, streamController.getStreams),
);

router.post(
  '/',
  validateBody(streamSchema.body),
  verifyAuthToken,
  verifyRoles(USER_ROLES.ADMIN),
  (req, res, next) => jsonResponse(req, res, next, streamController.addNewStream),
);

module.exports = router;
