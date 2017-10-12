'use strict'
const {renderToStaticMarkup} = require('react-dom/server');

module.exports = {
  async root(ctx) {

    const indexView = require('../views/index-server');
    const indexViewHtml = renderToStaticMarkup(indexView());
    ctx.body = indexViewHtml;

  },
  async error(ctx) {
    throw Error('Oops!');
  }
}

