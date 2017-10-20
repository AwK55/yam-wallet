'use strict'
const cardService = require('../../services/cardService');
const validate = require('../validation/card');
const cardHelper = require('../../models/card/cardHelper');


module.exports = {
  async create(ctx) {

    const data = ctx.request.body;
    let { error, value } =  validate(data);
    if (error) {
      ctx.status = 404; 
      ctx.body = error;
      return;
    }
    value.type = data.type || cardHelper.getCardType(data.cardNumber);
    value.cardNumber = cardHelper.formatCardNumber(data.cardNumber, '-');
    ctx.body = await cardService.create(value);
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
