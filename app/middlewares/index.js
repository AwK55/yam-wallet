const compose = require('koa-compose');
const serve = require('koa-static');
const routes = require('./routes');
const logger = require('./logger');
const errorHandler = require('./errorHandler');

module.exports = () => {
  return compose([
    logger,
    errorHandler,
    require('koa-bodyparser')(),
    routes(),
    serve('public')
  ]);
};
