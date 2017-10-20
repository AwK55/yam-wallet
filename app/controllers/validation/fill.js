// where it should be?
const Joi = require('joi');


const schema = {
  cardId: Joi.number().required(),
  type: Joi.string(),
  amount: Joi.number().positive(),

};

module.exports = (data) => {
  return Joi.validate(data, schema,  appConfig.joi);
}
