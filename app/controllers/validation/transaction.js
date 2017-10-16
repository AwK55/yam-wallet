const Joi = require('joi');

const schema = {
  cardId: Joi.number().required(),
  sum: Joi.number().required().positive(),
  type: Joi.string(),
  time: Joi.date().iso().optional(),
  data: Joi.string().optional()
};

const options = { allowUnknown: true };


module.exports = (data) => {
  return Joi.validate(data, schema, options);
}
