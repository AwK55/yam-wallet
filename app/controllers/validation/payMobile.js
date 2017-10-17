// where it should be?
const Joi = require('joi');


const schema = {
  cardId: Joi.number().required(),
  phoneNumber: Joi.string().required().regex(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/),
  type: Joi.string(),
  sum: Joi.number().positive(),
  commision: Joi.number().positive()

};

const options = { allowUnknown: true };


module.exports = (data) => {
  return Joi.validate(data, schema, options);
}
