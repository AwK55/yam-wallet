const Joi = require('joi');

const schema = {
  target: Joi.number().required(),
  sum: Joi.number().required().positive(),
  type: Joi.string().optional()
};

const options = { allowUnknown: true };


module.exports = (data) => {
  return Joi.validate(data, schema, options);
}
