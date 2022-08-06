const express = require('express');

const router = express.Router();

const subjectController = require('../controllers/subjectController');
const { USER_ROLES } = require('../lib/constants/userConstants');
const {
  validateBody,
  validateQuery,
  verifyAuthToken,
  verifyRoles,
} = require('../middlewares');
const {
  subjectSchema,
} = require('../middlewares/schemas');
const {
  jsonResponse,
} = require('./shared');

router.get(
  '/',
  validateQuery(subjectSchema.query),
  verifyAuthToken,
  verifyRoles(USER_ROLES.ADMIN, USER_ROLES.NON_ADMIN),
  (req, res, next) => jsonResponse(req, res, next, subjectController.getSubjects),
);

router.post(
  '/',
  validateBody(subjectSchema.body),
  verifyAuthToken,
  verifyRoles(USER_ROLES.ADMIN),
  (req, res, next) => jsonResponse(req, res, next, subjectController.addNewSubject),
);

module.exports = router;
