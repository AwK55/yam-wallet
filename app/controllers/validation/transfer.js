const Joi = require('joi');

const schema = {
  target: Joi.number().required(),
  cardId: Joi.number().required(),
  sum: Joi.number().required().positive(),
  type: Joi.string().optional()
};

module.exports = (data) => {
  return Joi.validate(data, schema,  appConfig.joi);
}
