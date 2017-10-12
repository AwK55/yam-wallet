const baseModel = require('../base/baseModel');

const transactionTypes = {

};


module.exports.create = (rawData) => {
  
  const MAX_TRANS_SUM = 5000;
  const base = baseModel(rawData.id);
  const cardId = rawData.cardId;
  const type = rawData.type;
  const data = rawData.data;
  const sum = rawData.sum;
  const time = rawData.time || new Date();

  return Object.assign(base, {
    getMaxLimit() {
      return MAX_TRANS_SUM;
    },
    get data() {
      return data;
    },
    get sum() {
      return sum;
    },
    get cardId() {
      return cardId;
    },
    get time() {
      return time;
    },
    get type() {
      return type;
    }
  });
};
