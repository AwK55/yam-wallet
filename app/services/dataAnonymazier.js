const { Transform } = require('stream');

class DataAnonymazierStream extends Transform {
  constructor(options = {}) {
    super(options);
  }

  _makeError(msg) {
    return new Error(`CardAnonymazierStream: ${msg}`)
  }

  _transform(chunk, encoding, callback) {
    if (Buffer.isBuffer(chunk)) {
      chunk = chunk.toString()
    }

    let data;
    if (typeof chunk === 'string') {
      try {
        data = JSON.parse(chunk);
      } catch (err) {
        return callback(this._makeError('Failed to parse JSON.'));
      }
    } else {
      data = chunk;
    }

    if (typeof data !== 'object') {
      return callback(this._makeError(
        `Received "${typeof data}" from stream. Expected Object.`
      ));
    }

    if (typeof data.data === 'string') {
      data.data = this._getDataMask(data.data, data.length / 3);
    } else if (data.data.cardNumber) data.data = this._getCardMask(data.data.cardNumber);
    else if (data.data.phoneNumber) data.data = this._getPhoneMask(data.data.phoneNumber);

    this.push(data);
    callback();
  }

  _getCardMask(cardNumber) {
    const fc = cardNumber.replace(/\D/g, '');
    return this._getDataMask(fc, 7, 12, '*');
  }
  _getPhoneMask(phone) {
    var l = phone.length;
    return this._getDataMask(phone, 4, l - 3, '*');
  }

  /**
   *replace part of string with replacer
   *
   * @param {String} data
   * @param {Number} begin begin of replaced substring
   * @param {Number} end end of replaced substring
   * @param {String} replacer by default '*'
   * @returns masked string
   * @memberof CardAnonymazierStream
   */
  _getDataMask(data, begin, end, replacer) {
    const l = data.length;
    replacer = replacer || '*';
    if (!l) return;
    if (!begin || begin > l || begin < 0) begin = 0;
    if (!end || end > l || end < 0) end = l;
    if (end < begin) end, begin = begin, end;

    return data.substring(0, begin) + replacer.repeat(end - begin) + data.substring(end);
  }

}

module.exports = () => new DataAnonymazierStream({
  readableObjectMode: false,
  writableObjectMode: true,
  objectMode: true
})
