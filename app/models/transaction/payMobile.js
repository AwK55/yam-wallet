const mongoose = require('mongoose'),
  Schema = mongoose.Schema;
const Transaction = require('./transaction')();

const options = { discriminatorKey: '_type' };
const payTransactionSchema = new Schema({
  data: {
    phoneNumber: { type: String }
  }
}, options);

module.exports = () => {
  payTransactionSchema.plugin(global.dbConnection.autoIncrement.plugin, { model: 'Transaction', field: 'id', startAt: 100 });
  Transaction.discriminator('PaymentMobile', payTransactionSchema);
}
