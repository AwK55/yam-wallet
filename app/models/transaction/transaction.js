const baseModel = require('../base/baseModel');

const create = ({ id, cardId, type, data, sum, time }) => {

  const base = baseModel(id);
  const trCardId = cardId;
  const trType = type;
  const trData = data;
  const trSum = sum;
  const trTime = time || new Date();
  // should I make this object observable? (by adding eventemmiter)
  return Object.assign(base, {
    get data() {
      return trData;
    },
    get sum() {
      return trSum;
    },
    get cardId() {
      return trCardId;
    },
    get time() {
      return trTime;
    },
    get type() {
      return trType;
    }
  });
}

module.exports.create = create;
