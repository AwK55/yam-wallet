const cardCollection = require('../models/card/cardCollection')();
const card = require('../models/card/card');

cardCollection.db.loadCollection();


function haveDublicates(id) {
  const dublicates = cardCollection.getFiltered((item) => card.number == item.number);
  return dublicates.length > 0;
}

/**
 *validate card logic
 * @param {any} card
 * @returns
 */
function validateModel(card) {
  let errors = [];
  if (haveDublicates(card.id)) errors.push('Card already added');
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

  return (card.balance - sum) > 0;
}

module.exports = {

  async create(data) {

    const newCard = card.create(data);
    const result = validateModel(newCard);
    if(result.length) return result;
    return await cardCollection.add(newCard);
  },

  updateBalance(card, sum) {
    const result = validateBalance(card, sum);
    if (!result) {
      card.balance -= sum;
      cardCollection.update(card);
    }
    return result;
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
