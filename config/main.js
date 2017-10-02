"use strict"
const path = require('path');

const env = process.env.NODE_ENV || 'development'
var port = process.env.port || 3000;
const host = 'http://localhost' + (port != 80 ? ':' + port : '');
var DUBUG=env !== 'production'

module.exports = {
    name: 'ym-wallet-node-school',
    env: env,
    static: {
        directory: path.resolve(__dirname, '../public')
    },
    session: {
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        }
    }
}
