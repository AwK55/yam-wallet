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

function getSenderInfo(data) {
  const newData = Object.create(data);
  const card = cardService.getCard(newData.data.targetCardId);
  if (card && card.cardNumber) newData.data.cardNumber = card.cardNumber;

  return newData;
}

function getReceiverInfo(data) {
  const newData = {};

  newData.data = {}
  newData.cardId = data.data.targetCardId;
  newData.data.senderCardId = data.cardId;

  const card = cardService.getCard(newData.data.senderCardId);
  if (card && card.cardNumber) newData.data.cardNumber = card.cardNumber;
  
  newData.sum = -data.sum;
  return Object.assign(Object.create(data),newData);
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
    if (data.cardId == data.data) return "Cannot transfer to this card";

    const sendRes = await this.create(getSenderInfo(data));

    if (sendRes.length) return sendRes;
    return await this.create(getReceiverInfo(data));
  },

  transactionList(cardId) {
    return transactCollection.getFiltered((item) => item.cardId == cardId);
  },

  allTransactions() {
    return transactCollection.getAll();
  }

};
