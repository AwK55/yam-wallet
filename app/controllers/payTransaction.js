'use strict'
const transactiondService = require('../services/transactionService');

const isDataValid = (data) => data &&
  Object.prototype.hasOwnProperty.call(data, 'type') &&
  Object.prototype.hasOwnProperty.call(data, 'data') &&
  Object.prototype.hasOwnProperty.call(data, 'sum') &&
  isNaN(data.cardId);

function validateData(data) {

  const result = {
    isValid: true
  };
  if (!isDataValid(data)) {
    result.error = 'Invalid data structure';
    result.isValid = false;
    return result;
  }

  return result
}

function prepareData(rawData) {
  const data = {};
  data.sum = rawData.amount;
  data.data = rawData.phone;
  data.type = 'paymentMobile';

  return data;
}

module.exports = {
  async create(ctx) {

    const rowData = ctx.request.body[0];
    rowData.cardId = parseInt(ctx.params.id);
    const result = validateData(rowData);

    if (result && result.isValid) {
      const data = prepareData(rawData);
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
  }
}
