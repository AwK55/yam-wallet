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
  if (Math.abs(transaction.sum) > transactionModel.getMaxLimit())
    errors.push(`Max transaction amount ${transactionModel.getMaxLimit()}`);

  return errors;
}

function getReceiver(data) {
  const newData = Object.create(data);
  newData.cardId = data.data;
  newData.data = data.cardId;
  newData.sum = -newData.sum;
  return newData;
}

module.exports = {

  transactionType: transactionModel.transactionType,

  async create(data) {
    const newTransaction = transactionModel.create(data);
    const card = cardService.getCard(newTransaction.cardId);

    let result = validateModel(newTransaction);
    if (result.length) return result;
    result = await cardService.updateBalance(card, newTransaction.sum);
    if (result) return result;
    return await transactCollection.add(newTransaction);
  },

  async transfer(data) {
    if( data.cardId == data.data ) return "Cannot transfer to this card";
    const sendRes = await this.create(data);    
    if(sendRes.length) return sendRes;
    return await this.create(getReceiver(data));
  },

  transactionList(cardId) {
    return transactCollection.getFiltered((item) => item.cardId == cardId);
  }

};
