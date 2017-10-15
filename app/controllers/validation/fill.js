// where it should be?
const Joi = require('joi');


const schema = {
  cardId: Joi.number().required(),
  type: Joi.string(),
  amount: Joi.number().positive(),

};

const options = { allowUnknown: true };


module.exports = (data) => {
  return Joi.validate(data, schema, options);
}
