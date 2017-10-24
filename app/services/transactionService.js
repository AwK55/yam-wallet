const cardService = require('./cardService'),
  csvService = require('./csvService'),
  dataAnonymazierStream = require('./dataAnonymazier');
  transaction = require('../models/transaction/transaction'),

  PayMobile = require('../models/transaction/payMobile'),
  Transfer = require('../models/transaction/transfer'),
  transactCollection = require('../models/modelCollection')(transaction.model());

  const Transaction = transaction.model();
/**
 * validate transaction logic
 *
 * @param {transaction} transaction
 * @returns
 */
function validateModel(model) {
  let errors = [];
  if (Math.abs(model.sum) > transaction.getMaxLimit())
    errors.push(`Max transaction amount ${transaction.getMaxLimit()}`);

  return errors;
}

async function getSenderInfo(data) {
  const newData = Object.assign({}, data);
  const card = await cardService.getCard(newData.data.cardId);
  if (card && card.cardNumber) {
    newData.data.cardNumber = card.cardNumber;
    newData.data.card = card._id;
  }
  return newData;
}

async function getReceiverInfo(data) {
  const newData = {};
  newData.data = {};

  newData.cardId = data.data.cardId;
  newData.data.cardId = data.cardId;

  const card = await cardService.getCard(newData.data.cardId);
  if (card && card.cardNumber) {
    newData.data.cardNumber = card.cardNumber;
    newData.data.card = card._id;
  }

  newData.sum = -data.sum;
  return Object.assign(Object.assign({}, data), newData);
}

async function createTypedTransaction(data) {
  switch (data.type) {
    case 'paymentMobile':
      return await new PayMobile(data);
    case 'card2Card':
      return await new Transfer(data);
    default:
      return await new Transaction(data);
  }
}

module.exports = {

  transactionType: transaction.transactionType,

  async create(data) {
    const newTransaction = await createTypedTransaction(data);
    const card = await cardService.getCard(data.cardId);
    newTransaction.card = card._id;

    let result = validateModel(newTransaction);
    if (result.length) return result;
    //if (result) return result;
    await transactCollection.add(newTransaction);
    return await cardService.updateBalance(card, newTransaction.sum);
  },

  async transfer(data) {
    if (data.cardId == data.data) return "Cannot transfer to this card";

    const sendRes = await this.create(await getSenderInfo(data));
    return await this.create(await getReceiverInfo(data));
  },

  async transactionList(cardId) {
    // rewrite to cursor
    const card = await cardService.getCard(cardId);
    return await transactCollection.getFiltered({ card: card._id });
  },

  allTransactions() {
    return transactCollection.getAll();
  },

  async TransactionListCsv(cardId) {
    const options = {
      headers: ['Time', 'Sum', 'Type', 'Data'],
      alias: {
        'Time': 'time',
        'Sum': 'sum',
        'Type': 'type'
      },
      virtuals: {
        'Data': function (doc) {
          if (typeof doc.data === 'string') return doc.data;
          if (doc.cardNumber) return doc.cardNumber;
          else doc.phoneNumber;
        }
      }
    };

    const card = await cardService.getCard(cardId);
    return await transactCollection
      .getFilteredStream({ card: card._id })
      .pipe(dataAnonymazierStream())
      .pipe(csvService(options));
  }
};
