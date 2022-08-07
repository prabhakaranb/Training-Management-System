const Joi = require('joi');

const schema = {
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
  params: Joi.object().keys({
    id: Joi.number()
      .required(),
  }).required(),
  query: Joi.object().keys({
    filterBy: Joi.string()
      .optional()
      .valid('subject', 'stream', 'type')
      .insensitive()
      .default(null),
    filterValue: Joi
      .when('filterBy', {
        is: Joi.string(),
        then: Joi.required(),
      }).default(null),
    page: Joi.number()
      .optional()
      .default(0),
    size: Joi.number()
      .optional()
      .default(10),
    sort: Joi.string()
      .optional()
      .valid('asc', 'desc', '1', '-1')
      .insensitive()
      .default(1),
  }),
};

module.exports = schema;
