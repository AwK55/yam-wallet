const app = require('koa'),
  router = require('koa-router')(),
  cards = require('../controllers/card'),
  main = require('../controllers/main'),
  transaction = require('../controllers/transaction/transaction'),
  fill = require('../controllers/transaction/fill'),
  transfer = require('../controllers/transaction/transfer'),
  pay = require('../controllers/transaction/payMobile');


module.exports = () => {
  router.get('/', main.root);
  router.get('/error', main.error);

  router.get('/cards/', cards.getCards);
  router.post('/cards/', cards.create);
  router.delete('/cards/:id', cards.delete);

  router.get('/cards/:id/transactions', transaction.getTransactionsByCard);
  router.post('/cards/:id/transactions', transaction.create);

  router.post('/cards/:id/pay', pay.create)

  router.post('/cards/:id/transfer', transfer.create);

  router.post('/cards/:id/fill', fill.create);

  return router.routes();

}
