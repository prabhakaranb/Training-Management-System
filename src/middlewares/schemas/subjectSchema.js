const Joi = require('joi');

const schema = {
  query: Joi.object().keys({
    page: Joi.number().optional().default(0),
    size: Joi.number().optional().default(10),
    sort: Joi.string()
      .optional()
      .valid('asc', 'desc', '1', '-1').insensitive()
      .default(1),
  }),
  body: Joi.object().keys({
    subjectName: Joi.string()
      .regex(/^[a-zA-Z ]+$/)
      .required(),
    streamName: Joi.string()
      .regex(/^[a-zA-Z ]+$/)
      .required(),
  }).required()
    .unknown(true),
};

module.exports = schema;
