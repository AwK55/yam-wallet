const baseCollection = require('../base/baseModelCollection');
const transaction = require('./transaction');

const transactionCollection = function () {

  return {
    async add(transaction) {
      transaction.id = this.generateId();
      let result = this.db.create(transaction);
      return result;
    }
  };
}
const transactions = () => Object.assign(baseCollection('transactions'), transactionCollection());
module.exports = transactions;
