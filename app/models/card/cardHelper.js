'use strict';

// https://gist.github.com/ShirtlessKirk/2134376
const luhnChk = (function (arr) {
  return function (ccNum) {
      let
          len = ccNum.length,
          bit = 1,
          sum = 0,
          val;

      while (len) {
          val = parseInt(ccNum.charAt(--len), 10);
          sum += (bit ^= 1) ? arr[val] : val;
      }

      return sum && sum % 10 === 0;
  };
}([0, 2, 4, 6, 8, 1, 3, 5, 7, 9]));

const bankUtils = {
	/**
	 * Типы банковскиx карт
	 * @type {Object}
	 */
	cardTypes: {
		VISA: 'visa',
		MAESTRO: 'maestro',
		MASTERCARD: 'mastercard',
		MIR: 'mir'
	},


	/**
	 * Проверяет тип карты
	 * @param {Number} val номер карты
	 * @returns {String} тип карты
	 */
	getCardType(val) {
		// Бины ПС МИР 220000 - 220499
		const mirBin = /^220[0-4]\s?\d\d/;

		const firstNum = val[0];

		switch (firstNum) {
			case '2': {
				if (mirBin.test(val)) {
					return bankUtils.cardTypes.MIR;
				} else {
					return '';
				}
			}
			case '4': {
				return bankUtils.cardTypes.VISA;
			}
			case '5': {
				const secondNum = val[1] || '';

				if (secondNum === '0' || secondNum > '5') {
					return bankUtils.cardTypes.MAESTRO;
				} else {
					return bankUtils.cardTypes.MASTERCARD;
				}
			}
			case '6': {
				return bankUtils.cardTypes.MAESTRO;
			}
			default: {
				return '';
			}
		}
	},

	/**
	 * Форматирует номер карты, используя заданный разделитель
	 *
	 * @param {String} cardNumber номер карты
	 * @param {String} delimeter = '\u00A0' разделитель
	 * @returns {String} форматированный номер карты
	 */
	formatCardNumber(cardNumber, delimeter) {
		let formattedCardNumber = [];
		delimeter = delimeter || '\u00A0';
		if (cardNumber) {
			while (cardNumber && typeof cardNumber === 'string') {
				formattedCardNumber.push(cardNumber.substr(0, 4));
				cardNumber = cardNumber.substr(4);
				if (cardNumber) {
					formattedCardNumber.push(delimeter);
				}
			}
		}
		return formattedCardNumber.join('');
  },

  luhnValidattion: luhnChk

};

module.exports = bankUtils;
