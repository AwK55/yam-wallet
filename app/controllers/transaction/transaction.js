'use strict'
const transactiondService = require('../../services/transactionService');
const validate = require('../validation/transaction');


module.exports = {
  /*
  
  async create(ctx) {

    const rawData = ctx.request.body;
    rawData.cardId = parseInt(ctx.params.id);
    let { error, value } = validate(rawData);

    if (error) {
      ctx.status = 404;
      ctx.body = error;
      return;
    }
    const newTransaction = await transactiondService.create(value);
    ctx.body = result;
  }, */

  async getTransactionsByCard(ctx) {
    const id = parseInt(ctx.params.id);
    if (id && id>0) ctx.body = await transactiondService.transactionList(id);
    else {
      ctx.status = 404;
      ctx.body = 'Card not found';
      return;
    }
  },

  async getAll(ctx) {
    ctx.body = await transactiondService.allTransactions();
  }
}
