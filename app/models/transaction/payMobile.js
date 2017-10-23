
const Transaction = require('./transaction');
const options = { discriminatorKey: '_type' };
const payTransactionSchema = new Schema({
  data: {
    phoneNumber: { type: String }
  }
}, options);

const PaymentMobile = Transaction.discriminator('paymentMobile', payTransactionSchema);