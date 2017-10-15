'use strict'
const transactiondService = require('../../services/transactionService');
const validate = require('../validation/payMobile');

function prepareData(rawData) {
  const data = {};
  data.sum = -Math.abs(parseFloat(rawData.amount));
  data.data = rawData.phone;
  data.type = transactiondService.transactionType.paymentMobile;
  data.cardId = rawData.cardId;

  return data;
}

module.exports = {
  async create(ctx) {

    const rawData = ctx.request.body[0];
    rawData.cardId = parseInt(ctx.params.id);
    let { error, value } = validate(rawData);

    if (error) {
      ctx.status = 404;
      ctx.body = error;
      return;
    }
    const data = prepareData(value);
    ctx.body = await transactiondService.create(data);
  },
}
