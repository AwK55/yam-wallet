const cardHelper = require('../../helpers/cardHelper');
const baseModel = require('../base/baseModel');

const create = function({ id, cardNumber, balance }) {

  const base = baseModel(id);
  const number = cardNumber;
  var balance = balance;

  // should I make this object observable? (by adding eventemmiter)
  return Object.assign(base, {
    get cardNumber() {
      return number;
    },

    get balance() {
      return balance;
    },

    set balance(balance) {
      balance = balance;
    },
    get cardType() {
      return cardHelper.getCardType(number);
    }

  });
}


module.exports.create = create;
