const app = require('koa'),
  router = require('koa-router')(),
  card = require('../app/controllers/card'),
  main = require('../app/controllers/main'),
  transactions = require('../app/controllers/transaction'),
  payTransactions = require('../app/controllers/payTransaction');


module.exports = () => {
  router.get('/', mainController.root);
  router.get('/error', mainController.error);

  //router.get('/transfer', cardController.transer);

  router.get('/cards/', cardController.getCards);
  router.post('/cards/', cardController.create);
  router.delete('/cards/:id', cardController.delete);

  router.get('/cards/:id/transactions', transactionController.getTransactionsByCard);
  router.post('/cards/:id/transactions', transactionController.create);

  router.post('/cards/:id/pay', payTransactions.create)

  router.post('/cards/:id/transer', payTransactions.create);

  router.post('/cards/:id/fill', payTransactions.create);

  return router.routes();

}
