const winston = require('winston');
const { combine, timestamp, label, printf } = winston.format;

const msgFormat = printf(info => {
  return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`;
});

module.exports = (lab) => {
  return {
    format: combine(
      label({ label: lab }),
      timestamp(),
      msgFormat
    ),
    transports: [
      new winston.transports.Console()
    ],
    exceptionHandlers: [
      new winston.transports.Console()
    ]

  }

};
