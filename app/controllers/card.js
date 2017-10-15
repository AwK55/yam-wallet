'use strict'
const cardService = require('../services/cardService');
const validate = require('./validation/card');
const cardHelper = require('../models/card/cardHelper');


module.exports = {
  async create(ctx) {

    const data = ctx.request.body[0];
    const result = await validate(data);
    if (resul.error) {
      ctx.status = 404;
      ctx.body = result.value;
      return;
    }
    data.type = data.type || cardHelper.getCardType(data.cardNumber);
    data.cardNumber = cardHelper.formatCardNumber(data.cardNumber, '-');
    ctx.body = await cardService.create(data);
  },

  async delete(ctx) {

    let n = parseInt(ctx.params.id);
    if (n) {
      ctx.body = await cardService.remove(n);
    } else {
      ctx.status = 404;
      ctx.body = 'Id is empty';
    }
  },

  async getCards(ctx) {
    ctx.body = await cardService.getCardsList();
  }

}
