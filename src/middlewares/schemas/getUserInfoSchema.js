const Joi = require('joi');

const schema = {
  params: Joi.object().keys({
    username: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]+$/),
  }).required(),
};

module.exports = schema;
