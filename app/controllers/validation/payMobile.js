// where it should be?
const Joi = require('joi');


const schema = {
  cardId: Joi.number().required(),
  phone: Joi.string().required().regex(/^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/),
  type: Joi.string(),
  amount: Joi.number().negative(),

};

const options = { allowUnknown: true };


module.exports = (data) => {
  return Joi.validate(data, schema, options);
}
