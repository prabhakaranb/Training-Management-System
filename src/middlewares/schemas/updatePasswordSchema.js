const Joi = require('joi');

const schema = {
  tempPasswordBody: Joi.object().keys({
    emailId: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
  }).required()
    .unknown(true),
  updatePasswordBody: Joi.object().keys({
    emailId: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    oldPassword: Joi.string()
      .regex(/^[a-zA-Z0-9!#$%&*]{6,12}$/)
      .required(),
    password: Joi.string()
      .regex(/^[a-zA-Z0-9!#$%&*]{6,12}$/)
      .required(),
  }).required()
    .unknown(true),
  params: Joi.object().keys({
    username: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]+$/),
  }).required(),
};

module.exports = schema;
