const mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  autoIncrement = require('mongoose-auto-increment');

const cardSchema = new Schema({
  cardNumber: String,
  id: { type: Number, unique: true },
  balance: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

cardSchema.methods.canTransact = function (sum) {
  return (this.balance + sum) >= 0;
}

cardSchema.methods.updateBalance = function(sum) {
  const result = this.canTransact(sum);
  if (!result) return false;
  this.balance += sum;
  return true
}

module.exports = () => {
  cardSchema.plugin(global.dbConnection.autoIncrement.plugin, { model: 'Card', field: 'id', startAt: 100 });
  return mongoose.model('Card', cardSchema);
}
