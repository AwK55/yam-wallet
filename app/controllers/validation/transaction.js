const Joi = require('joi');

const schema = {
  cardId: Joi.number().required(),
  sum: Joi.number().required().positive(),
  type: Joi.string(),
  time: Joi.date().iso().optional(),
  data: Joi.string().optional()
};


module.exports = (data) => {
  return Joi.validate(data, schema,  appConfig.joi);
}
