const baseCollection = require('../base/baseModelCollection');
const transaction = require('./transaction');

const transactionCollection = function () {

  return {
    async add(transaction) {
      data.id = this.generateId();
      let result = this.db.create(newTransaction);
      return result;
    }
  };
}
const transactions = () => Object.assign(baseCollection('transactions'), transactionCollection());
module.exports = transactions;
