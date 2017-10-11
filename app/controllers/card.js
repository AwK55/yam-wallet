'use strict'
const cardService = require('../services/cardService');
// where it should be?
const cardHelper = require('../models/card/cardHelper');

const isDataValid = (data) => data &&
  Object.prototype.hasOwnProperty.call(data, 'cardNumber') &&
  Object.prototype.hasOwnProperty.call(data, 'balance');

function validateData(data) {

  const result = { isValid: true };
  if (!isDataValid(data)) {
    result.error = 'Invalid data structure';
    result.isValid = false;
    return result;
  }

  data.cardNumber = data.cardNumber.replace(/\D/g, '');
  if (cardHelper.luhnValidattion(data.cardNumber)) return result;
  result.error = 'invalid card number';
  result.isValid = false;
  return result
}

module.exports = {
  async create(ctx) {

    const data = ctx.request.body[0];
    const result = validateData(data);
    if (result && result.isValid) {
      data.type = cardHelper.getCardType(data.cardNumber);
      data.cardNumber = cardHelper.formatCardNumber(data.cardNumber, '-');
      ctx.body  = await cardService.create(data);
      return;
    }
    ctx.status = 404;
    ctx.body = result;
  },

  async delete(ctx) {

    let n = parseInt(ctx.params.id);
    if (n) {
      ctx.body = await cardService.remove(n);
    } else {
      ctx.status = 404;
      ctx.body = 'Wrong Id';
    }
  },
  async getCards(ctx) {
    ctx.body = await cardService.getCardsList();
  }

  // async transer(ctx) {
  //     const {
  // 		amount,
  // 		from,
  // 		to
  // 	} = req.query;
  // 	ctx.json({
  // 		result: 'success',
  // 		amount,
  // 		from,
  // 		to
  // 	});
  // }
}
