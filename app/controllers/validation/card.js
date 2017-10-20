// where it should be?
const Joi = require('joi');


const schema = {
  cardNumber: Joi.string().creditCard().required(),
  balance: Joi.number().required(),
  type: Joi.string()
};


module.exports = (data) => {
  return Joi.validate(data, schema, appConfig.joi);
}
