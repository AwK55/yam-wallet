
const compose = require('koa-compose');
const serve = require('koa-static');


module.exports = () => {
    return compose([
        require('koa-bodyparser')(),
        serve('public')
    ]);
  };
