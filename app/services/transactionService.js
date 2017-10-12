const cardService = require('./cardService');
const transactCollection = require('../models/transaction/transactionCollection')();
const transactionModel = require('../models/transaction/transaction');

transactCollection.db.loadCollection()
  .catch((res) => {
    throw new Error('transactCollection is not loaded');
  });

/**
 * validate transaction logic
 *
 * @param {transaction} transaction
 * @returns
 */
function validateModel(transaction) {
  let errors = [];
  if (transaction.sum > transactionModel.getMaxLimit())
    errors.push(`Max transaction amount ${transactionModel.getMaxLimit()}`);

  return errors;
}


module.exports = {

  async create(data) {
    const newTransaction = transactionModel.create({ ...data
    });
    const card = cardService.getCard(newTransaction.cardId);

    let result = validateModel(transaction);
    if (result.length) return result;
    result = await cardService.updateBalance(card, newTransaction.sum);
    if (result) return result;
    return await transactCollection.add(newTransaction);
  },

  transactionList(cardId) {
    return transactCollection.getFiltered((item) => item.cardId == cardId);
  }

};
