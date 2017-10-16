const Joi = require('joi');

const schema = {
  receiverCardId: Joi.number().required(),
  amount: Joi.number().required().positive(),
  type: Joi.string().optional()
};

const options = { allowUnknown: true };


module.exports = (data) => {
  return Joi.validate(data, schema, options);
}
