const baseModel = require('../base/baseModel');

module.exports.transactionType = {
  prepaidCard: 'prepaidCard',
  paymentMobile: 'paymentMobile',
  card2Card: 'card2Card'
};

const MAX_TRANS_SUM = 5000;

module.exports.getMaxLimit = function () {
  return MAX_TRANS_SUM;
};

module.exports.create = (rawData) => {

  const base = baseModel(rawData.id);
  const cardId = rawData.cardId;
  const type = rawData.type;
  const data = rawData.data;
  const sum = rawData.sum;
  const time = rawData.time || new Date();

  return Object.assign(base, {

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
