const authSchema = require('./authSchema');
const courseSchema = require('./courseSchema');
const streamSchema = require('./getUserInfoSchema');
const getUserInfoSchema = require('./streamSchema');
const subjectSchema = require('./subjectSchema');
const updatePasswordSchema = require('./updatePasswordSchema');
const updateProfileSchema = require('./updateProfileSchema');

module.exports = {
  authSchema,
  courseSchema,
  getUserInfoSchema,
  streamSchema,
  subjectSchema,
  updatePasswordSchema,
  updateProfileSchema,
};
