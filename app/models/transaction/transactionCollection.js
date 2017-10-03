const baseCollection = require('../base/baseModelCollection');
const transaction = require('./transaction');

const transactionCollection = function () {

  const isDataValid = (tr) => tr &&
    Object.prototype.hasOwnProperty.call(tr, 'type') &&
    Object.prototype.hasOwnProperty.call(tr, 'data') &&
    Object.prototype.hasOwnProperty.call(tr, 'time') &&
    Object.prototype.hasOwnProperty.call(tr, 'sum');

  return {
    async add(data) {
      //check
      if (isDataValid(data)) {
        data.id = this.generateId();
        const newTransaction = transaction.create(data);
        let result = this.db.create(newTransaction);
        this.collection.push(newTransaction);
        return result;

        result.success = await db.save();
      } else throw new Error('Invalid data');
    }
  };
}
const transactions = () => Object.assign(baseCollection('transactions'), transactionCollection());
module.exports = transactions;
