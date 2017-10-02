const app = require('koa'),
    router = require('koa-router')(),
    cardController = require('../app/controllers/card');
	mainController = require('../app/controllers/main');
	transactionController = require('../app/controllers/transaction');



module.exports = () => {
	router.get('/', mainController.root);
	router.get('/error', mainController.error);

	//router.get('/transfer', cardController.transer);

	router.get('/cards/', cardController.getCards);
	router.post('/cards/', cardController.create);
	router.delete('/cards/:id', cardController.delete);

	router.get('/cards/:id/transactions', transactionController.getTransactionsByCard);
	router.post('/cards/:id/transactions', transactionController.create);

	return router.routes();

}
