const baseCollection = require('../base/baseModelCollection');

const cardCollection = function () {
  return {
    async add(card) {
      card.id = this.generateId();
      let result = await this.db.create(card);
      return result;
    },
    async update() {
      // const prevCard = this.getRecord(card.id);
      // for (prop in prevCard) {
      //   if (card[prop])
      //     prevCard[prop] = card[prop];
      // }
      if(!await this.db.update()) return 'Db update error';
    },
    async remove(id) {
      let n = this.getindexById(id);
      if (n) return await this.db.remove(n);
      return 'Card not found';
    }
  };
}

const cards = () => Object.assign(baseCollection('cards'), cardCollection());
module.exports = cards;
