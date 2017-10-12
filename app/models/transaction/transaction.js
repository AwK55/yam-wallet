const baseModel = require('../base/baseModel');

const transactionTypes = {

};

const MAX_TRANS_SUM = 5000;

module.exports.create = ({
  id,
  cardId,
  type,
  data,
  sum,
  time
}) => {

  const base = baseModel(id);
  const trCardId = cardId;
  const trType = type;
  const trData = data;
  const trSum = sum;
  const trTime = time || new Date();

  return Object.assign(base, {
    getMaxLimit() {
      return MAX_TRANS_SUM;
    },
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
};
