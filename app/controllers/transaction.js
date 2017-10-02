'use strict'
const transactCollection = require('../models/transaction/transactionCollection')();

module.exports = {
  async create(ctx) {
    //алгоритм Луна duplicate
    //validateCard(callback add Card) 

    const transaction = ctx.request.body[0];
    transaction.cardId = ctx.params.id;
    var result = await transactCollection.add(transaction);

    ctx.body = result;

  },
  async getTransactionsByCard(ctx) {
    if (ctx.params.id) {
      let id = ctx.params.id;
      let cards = await transactCollection.getFilteredCollection((item) => item.cardId == id);
      ctx.body = cards;
    } else ctx.body = { success: false, error: 'transaction not found' };
  }
}
