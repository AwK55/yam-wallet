const Koa = require('koa');
global.dbConnection = require('./app/db/mongooseConnection');
const middlewares = require('./app/middlewares/index');
const config = require('./config/index');
const logger = require('./utils/logService')('app');

const app = new Koa();

global.appConfig = config;
app.name = config.main.name;
app.env = config.main.env;
app.use(middlewares());

module.exports = app;
