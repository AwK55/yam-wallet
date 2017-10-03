'use strict'
const transactCollection = require('../models/transaction/transactionCollection')();
transactCollection.db.loadCollection();

module.exports = {
  async create(ctx) {
    //check card?

    const transaction = ctx.request.body[0];
    transaction.cardId = ctx.params.id;
    var result = await transactCollection.add(transaction);

    ctx.body = result;

  },
  async getTransactionsByCard(ctx) {
    if (ctx.params.id) {
      let id = ctx.params.id;
      let cards = await transactCollection.getFiltered((item) => item.cardId == id);
      ctx.body = cards;
    } else ctx.body = { success: false, error: 'transaction not found' };
  }
}
