
const compose = require('koa-compose');
const serve = require('koa-static');
const routes = require('./routes');

module.exports = () => {
    return compose([
        require('koa-bodyparser')(),
        routes(),
        serve('public')
    ]);
  };
