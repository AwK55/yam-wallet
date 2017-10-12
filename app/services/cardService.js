const cardCollection = require('../models/card/cardCollection')();
const card = require('../models/card/card');

cardCollection.db.loadCollection()
  .catch((res) => {
    throw new Error('CardCollection is not loaded');
  });

function haveDublicates(cardNumber) {
  const dublicates = cardCollection.getFiltered((item) => item.cardNumber = cardNumber);
  return dublicates.length > 0;
}

/**
 *validate card logic
 * @param {any} card
 * @returns
 */
function validateModel(card) {
  let errors = [];
  if (haveDublicates(card.cardNumber)) errors.push('Card already added');
  return errors;
}


/**
 *check can pay by this card
 *
 * @param {any} card
 * @param {any} sum
 * @returns
 */
function validateBalance(card, sum) {

  return (card.balance + Math.abs(sum)) > 0;
}

module.exports = {

  async create(data) {

    const newCard = card.create(data);
    const result = validateModel(newCard);
    if (result.length) return result;
    return await cardCollection.add(newCard);
  },

  async updateBalance(card, sum) {
    const result = validateBalance(card, sum);
    if (result.length) return result;
    card.balance -= sum;
    return await cardCollection.update();
  },
  getCard(id) {
    return cardCollection.getRecord(id);
  },
  getCardsList() {
    return cardCollection.getAll();
  },

  remove(id) {
    return cardCollection.remove(id);
  }
};
