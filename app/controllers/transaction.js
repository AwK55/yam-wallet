'use strict'
const transactiondService = require('../services/transactionService');

const isDataValid = (tr) => tr &&
  Object.prototype.hasOwnProperty.call(tr, 'type') &&
  Object.prototype.hasOwnProperty.call(tr, 'data') &&
  Object.prototype.hasOwnProperty.call(tr, 'sum');

function validateData(data) {

  const result = { isValid: true };
  if (!isDataValid(data)) {
    result.error = 'Invalid data structure';
    result.isValid = false;
    return result;
  }

  return result
}

module.exports = {
  async create(ctx) {

    const data = ctx.request.body[0];
    const result = validateData(data);
    data.cardId = parseInt(ctx.params.id);
    if (result && result.isValid) {
      const newTransaction = await transactiondService.create(result.data);
      ctx.body = result;
      return;
    }
    ctx.status = 404;
    ctx.body = result;
  },
  async getTransactionsByCard(ctx) {
    const id = parseInt(ctx.params.id);

    const transactions = await transactiondService.transactionList(id);
    ctx.body = transactions;
  }
}
