const app = require('koa'),
  router = require('koa-router')(),
  cards = require('../app/controllers/card'),
  main = require('../app/controllers/main'),
  transactions = require('../app/controllers/transaction'),
  payTransactions = require('../app/controllers/payTransaction');


module.exports = () => {
  router.get('/', mainController.root);
  router.get('/error', mainController.error);

  //router.get('/transfer', cardController.transer);

  router.get('/cards/', cards.getCards);
  router.post('/cards/', cards.create);
  router.delete('/cards/:id', cards.delete);

  router.get('/cards/:id/transactions', transactions.getTransactionsByCard);
  router.post('/cards/:id/transactions', transactions.create);

  router.post('/cards/:id/pay', payTransactions.create)

  router.post('/cards/:id/transer', transactions.transer);

  router.post('/cards/:id/fill', payTransactions.create);

  return router.routes();

}
