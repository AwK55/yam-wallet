const Card = require('../models/card/card')();
const cardCollection = require('../models/modelCollection')(Card);


/**
 *check can pay by this card
 *
 * @param {any} card
 * @param {any} sum
 * @returns
 */
function validateBalance(card, sum) {

  return (card.balance + sum) >= 0;
}

module.exports = {

  async create(data) {
    const newCard = await new Card(data);
    return await cardCollection.add(newCard);
  },

  async updateBalance(card, sum) {
    const result = validateBalance(card, sum);
    if (!result) return 'there are not enought money on this card';
    card.balance += sum;
    return await cardCollection.update(card);
  },

  async getCard(id) {
    return await cardCollection.getRecord(id);
  },

  async getCardsList() {
    return await cardCollection.getAll();
  },

  async remove(id) {
    const res = await cardCollection.remove(id);
    if(!res) return 'Not found';
    
  }
};
