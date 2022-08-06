const Joi = require('joi');

const {
  userConstants,
} = require('../../lib/constants');

const schema = {
  body: Joi.object().keys({
    username: Joi.string()
      .regex(/^[a-zA-Z0-9]+$/)
      .min(3)
      .max(15)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9!#$%&*]{6,12}$/)
      .required(),
    role: Joi.string()
      .regex(/^[a-zA-Z0-9]$/)
      .valid(userConstants.USER_ROLES.ADMIN, userConstants.USER_ROLES.NON_ADMIN)
      .optional(),
  }).required()
    .unknown(true),
};

module.exports = schema;
