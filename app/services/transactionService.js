const cardService = require('./cardService');
const Transaction = require('../models/transaction/transaction')();
const transactCollection = require('../models/modelCollection')();

/**
 * validate transaction logic
 *
 * @param {transaction} transaction
 * @returns
 */
function validateModel(transaction) {
  let errors = [];
  if (Math.abs(transaction.sum) > transaction.getMaxLimit())
    errors.push(`Max transaction amount ${transaction.getMaxLimit()}`);

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

  transactionType: transaction.transactionType,

  async create(data) {
    const newTransaction = new Transaction(data);
    const card = cardService.getCard(newTransaction.cardId);
    newTransaction.cardId = card._id;
    
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
    return transactCollection.getFiltered({cardId:});
  },

  allTransactions() {
    return transactCollection.getAll();
  }

};
