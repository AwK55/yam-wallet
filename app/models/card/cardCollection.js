const baseCollection = require('../base/baseModelCollection');
const card = require('./card');

const cardCollection = function () {

  const isDataValid = (card) => card &&
    Object.prototype.hasOwnProperty.call(card, 'cardNumber') &&
    Object.prototype.hasOwnProperty.call(card, 'balance');

  return {
    async add(data) {
      //check
      if (isDataValid(data)) {
        data.id = this.generateId();
        const newCard = card.create(data);
        let result = this.db.create(newCard);
        this.collection.push(newCard);
        return result;

      } else throw new Error('Invalid data');

    },
    async remove(id) {
      let result;
      if (id) {
        let n = this.getindexById(id);
        result = await this.db.remove(n);
      }
      return result;
    }
  };
}

const cards = () => Object.assign(baseCollection('cards'), cardCollection());
module.exports = cards;
