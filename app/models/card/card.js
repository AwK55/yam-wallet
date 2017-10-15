const baseModel = require('../base/baseModel');

// should I make this object observable? (by adding eventemmiter)
module.exports.create = function (data) {

  const base = baseModel(data.id);
  const cardNumber = data.cardNumber;
  const balance = data.balance;
  const type = data.type;

  return Object.assign(base, {
    get cardNumber() {
      return cardNumber;
    },

    get balance() {
      return balance;
    },

    set balance(sum) {
      balance = sum;
    },

    get cardType() {
      return type;
    }

  });
}
