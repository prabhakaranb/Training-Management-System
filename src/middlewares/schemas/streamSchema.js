const Joi = require('joi');

const schema = {
  body: Joi.object().keys({
    name: Joi.string()
      .regex(/^[a-zA-Z ]+$/)
      .required(),
  }).required()
    .unknown(true),
};

module.exports = schema;
