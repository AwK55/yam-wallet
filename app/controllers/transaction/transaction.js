'use strict'
const transactiondService = require('../../services/transactionService');
const validate = require('../validation/transaction');

function getFormatedDate() {
  var today = new Date();
  var dd = today.getDate();

  var mm = today.getMonth() + 1;
  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }

  if (mm < 10) {
    mm = '0' + mm;
  }
  return  mm + '-' + dd + '-' + yyyy
}
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
      ctx.body = newTransaction;
    },
  */
  async getTransactionsByCard(ctx) {
    const id = parseInt(ctx.params.id);
    if (id && id > 0) ctx.body = await transactiondService.transactionList(id);
    else {
      ctx.status = 404;
      ctx.body = 'Card not found';
      return;
    }
  },

  async getAll(ctx) {
    ctx.body = await transactiondService.allTransactions();
  },

  async getTrancasctionsByCardCsv(ctx) {
    const id = parseInt(ctx.params.id);
    if (id && id > 0) {
      ctx.statusCode = 200;
      ctx.set({
        'Content-Type': 'text/csv',
        'Content-Disposition': `attachment; filename=${getFormatedDate()}-transactions-history.csv`
      })
      ctx.body = await transactiondService.TransactionListCsv(id);
    }
    else {
      ctx.status = 404;
      ctx.body = 'Card not found';
      return;
    }
  }
}
