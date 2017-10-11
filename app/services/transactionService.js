const cardService = require('./cardService');
const transactCollection = require('../models/transaction/transactionCollection')();
transactCollection.db.loadCollection();


function haveDublicates(id) {
  const dublicates = cardCollection.getFiltered((item) => card.number == item.number);
  return dublicates.length > 0;
}
/**
 * validate transaction logic
 *
 * @param {transaction} transaction
 * @returns
 */
function validateModel(transaction) {
  let errors = [];
  if (haveDublicates(transaction.id)) errors.push('transaction already added');
  return errors;
}


module.exports = {

  create(data) {
    const newTransaction = transaction.create(data);
    const card = cardService.getCard(newTransaction.cardId);

    let result = validateModel(transaction);
    result.push(cardService.updateBalance(card, transaction.sum))
    if (!result) return transactCollection.add(card);
    return result;
  },

  transactionList(cardId) {
    return transactCollection.getFiltered((item) => item.cardId == cardId);
  }

};
