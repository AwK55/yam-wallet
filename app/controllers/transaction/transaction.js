'use strict'
const transactiondService = require('../../services/transactionService');
const validate = require('../validation/transaction');


module.exports = {
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
  },

  async getTransactionsByCard(ctx) {
    const id = parseInt(ctx.params.id);
    if (id) ctx.body = await transactiondService.transactionList(id);
  },

  async getAll(ctx) {
    ctx.body = await transactiondService.allTransactions();
  }
}
