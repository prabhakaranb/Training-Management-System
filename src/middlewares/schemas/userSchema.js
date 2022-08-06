const Joi = require('joi');

const schema = {
  params: Joi.object().keys({
    username: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]+$/),
  }).required(),
  body: Joi.object().keys({
    firstName: Joi.string()
      .regex(/^[a-zA-Z ]+$/)
      .required(),
    lastName: Joi.string()
      .regex(/^[a-zA-Z ]+$/)
      .required(),
    emailId: Joi.string()
      .email({ minDomainSegments: 2 })
      .required(),
    phoneNumber: Joi.string()
      .regex(/^[0-9]{3,30}$/)
      .required(),
  }).required()
    .unknown(true),
};

module.exports = schema;
