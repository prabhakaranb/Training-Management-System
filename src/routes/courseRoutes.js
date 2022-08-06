const express = require('express');

const router = express.Router();

const courseController = require('../controllers/courseController');
const { USER_ROLES } = require('../lib/constants/userConstants');
const {
  validateBody,
  verifyAuthToken,
  verifyRoles,
} = require('../middlewares');
const {
  courseSchema,
} = require('../middlewares/schemas');
const {
  jsonResponse,
} = require('./shared');

router.get(
  '/',
  verifyAuthToken,
  verifyRoles(USER_ROLES.ADMIN, USER_ROLES.NON_ADMIN),
  (req, res, next) => jsonResponse(req, res, next, courseController.getCourses),
);

router.get(
  '/:id',
  validateBody(courseSchema.body),
  verifyAuthToken,
  verifyRoles(USER_ROLES.ADMIN, USER_ROLES.NON_ADMIN),
  (req, res, next) => jsonResponse(req, res, next, courseController.getCourse),
);

router.post(
  '/',
  validateBody(courseSchema.body),
  verifyAuthToken,
  verifyRoles(USER_ROLES.ADMIN),
  (req, res, next) => jsonResponse(req, res, next, courseController.addNewCourse),
);

module.exports = router;
