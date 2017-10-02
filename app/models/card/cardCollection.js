const baseCollection = require('../base/baseModelCollection');
const card = require('./card');

const initialize = function () {
  //baseCollection.call(this, 'cards');
  const base = baseCollection('cards');

  const isDataValid = (card) => card &&
    Object.prototype.hasOwnProperty.call(card, 'cardId') &&
    Object.prototype.hasOwnProperty.call(card, 'balance');


  return Object.assign(base, {
    async add(data) {
      let result = { success: false, error: '' }
      //check
      if (isDataValid(data)) {
        data.id = generateId();
        const newCard = card.create(data);
        collection.push(newCard);

        result.success = await db.save();
      }

      return result;
    },
    async remove(id) {
      let result;
      if (id) {
        let n = getindexById(id);
        result = await db.remove(n);
      }
      return result;
    },
    getAll() {
      return collection;
    },
    getById(id) {
      if (id) {
        return collection.find((item) => item.id === id);
      } else return { success: false, error: 'card not found' }
    }
  });
}

module.exports = initialize;
