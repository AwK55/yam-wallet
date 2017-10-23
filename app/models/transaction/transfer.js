const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const Transaction = require('./transaction')();

const options = { discriminatorKey: '_type' };

const transferTransactionSchema = new Schema({
  data: {
    cardNumber: { type: String },
    cardId: { type: Number },
    card: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' }
  }
}, options);

module.exports = () => {
  transferTransactionSchema.plugin(global.dbConnection.autoIncrement.plugin, { model: 'Transaction', field: 'id', startAt: 100 });
  return Transaction.discriminator('Transfer', transferTransactionSchema);
};

