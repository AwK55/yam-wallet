const mongoose = require('mongoose'),
  Schema = mongoose.Schema;

const MAX_TRANS_SUM = 5000; // too bad

const options = { discriminatorKey: '_type' };
const transactionSchema = new Schema({
  id: { type: Number, unique: true },
  card: { type: Schema.Types.ObjectId, ref: 'Card' },
  sum: { type: Number, max: MAX_TRANS_SUM },
  //data: String,
  time: { type: Date, default: Date.now },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  type: { type: String }
}, options);



module.exports.model = function () {
  transactionSchema.plugin(global.dbConnection.autoIncrement.plugin, { model: 'Transaction', field: 'id', startAt: 100 });
  return mongoose.model('Transaction', transactionSchema, 'transactions');
};

module.exports.transactionType = {
  prepaidCard: 'prepaidCard',
  paymentMobile: 'paymentMobile',
  card2Card: 'card2Card'
};

module.exports.getMaxLimit = function () {
  return MAX_TRANS_SUM;
};
