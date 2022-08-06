const Joi = require('joi');

const schema = {
  params: Joi.object().keys({
    id: Joi.number()
      .required(),
  }).required(),
  body: Joi.object().keys({
    courseName: Joi.string()
      .regex(/^[a-zA-Z ]+$/)
      .required(),
    subjects: Joi.array()
      .items(Joi.string())
      .required(),
    type: Joi.string()
      .regex(/^[a-zA-Z ]+$/)
      .required(),
  }).required()
    .unknown(true),
};

module.exports = schema;
