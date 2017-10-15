const Koa = require('koa');
const middlewares = require('./app/middlewares/index');
const config = require('./config/index');
const logger = require('./utils/logService')('app');

module.exports.load = function () {

  const app = new Koa();

  app.name = config.main.name;
  app.env = config.main.env;

  app.use(middlewares());

  app.listen(3000, () => {
    logger.info('YM Node School App listening on port 3000!');
  });
}
