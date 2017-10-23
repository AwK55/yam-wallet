
const Transaction = require('./transaction');
const options = { discriminatorKey: '_type' };

const transferTransactionSchema = new Schema({
    data: {
      cardNumber: { type: String },
      cardId: { type: mongoose.Schema.Types.ObjectId, ref: 'Card' }
    }
  }, options);

  const PaymentMobile = Transaction.discriminator('transfer', transferTransactionSchema);