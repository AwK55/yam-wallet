const baseCollection = require('../base/baseModelCollection');
const transaction = require('./transaction');

const initialize = () => {
  const base = baseCollection('transactions');


  const isDataValid = (tr) => tr &&
    Object.prototype.hasOwnProperty.call(tr, 'type') &&
    Object.prototype.hasOwnProperty.call(tr, 'data') &&
    Object.prototype.hasOwnProperty.call(tr, 'time') &&
    Object.prototype.hasOwnProperty.call(tr, 'sum');

  return Object.assign(base, {
    async add(data) {
      let result = { success: false, error: '' }
      //check
      if (isDataValid(data)) {
        data.id = generateId();
        const newTransaction = transaction.create(data);
        collection.push(newTransaction);

        result.success = await db.save();
      }

      return result;
    },
    getAll() {
      return collection;
    },
    async getById(id) {
      return await collection.find((item) => item.id === id);
    },

    async getFilteredCollection(filter) {
      return await collection.filter(filter);
    }
  });
}
module.exports = initialize;
