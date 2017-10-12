'use strict'
const transactiondService = require('../services/transactionService');

const isDataValid = (data) => data &&
  Object.prototype.hasOwnProperty.call(data, 'type') &&
  Object.prototype.hasOwnProperty.call(data, 'data') &&
  Object.prototype.hasOwnProperty.call(data, 'sum') &&
  isNaN(data.cardId);

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
    data.cardId = parseInt(ctx.params.id);
    const result = validateData(data);

    if (result && result.isValid) {
      const newTransaction = await transactiondService.create(data);
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
  },
  async transer(ctx) {

    let data = ctx.request.body[0];
    data.cardId = parseInt(ctx.params.id);
    data = prepareData(data);
    const result = validateData(data);
    if (result && result.isValid) {
      const newTransactionSent = await transactiondService.create(data);

    }

    const { amount, from, to } = ctx;
    ctx.body({
      result: 'success',
      amount,
      from,
      to
    });
  }
}
