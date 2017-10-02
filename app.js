const Koa = require('koa');
const middlewares = require('./app/middlewares/index');
const config = require('./config/index');

module.exports.load = function () {

  const app = new Koa();

  app.name = config.main.name;
  app.env = config.main.env;

  app.use(middlewares());
  app.use(config.routes());


  app.listen(3000, () => {
    console.log('YM Node School App listening on port 3000!');
  });
}
