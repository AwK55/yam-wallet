'use strict';
const winston = require('winston');
const config = require('../../config/logger');

module.exports = (label) =>  winston.createLogger(config(label));
