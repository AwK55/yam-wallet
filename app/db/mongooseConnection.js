const mongoose = require('mongoose'),
  autoIncrement = require('mongoose-auto-increment'),
  logger =require('../../utils/logService')('db');

const config = require('../../config/');
const db_server = process.env.DB_ENV || 'primary';
mongoose.Promise = global.Promise;

mongoose.connection.on("connected", function (ref) {
  logger.info("Connected to " + db_server + " DB!");
});


mongoose.connection.on("error", function (err) {
  logger.error('Failed to connect to DB ' + db_server + ' on startup ', err);
});

mongoose.connection.on('disconnected', function () {
  logger.info('Mongoose default connection to DB :' + db_server + ' disconnected');
});


const gracefulExit = function () {
  mongoose.connection.close(function () {
    logger.info('Mongoose default connection with DB :' + db_server + ' is disconnected through app termination');
    process.exit(0);

  });

}

// If the Node process ends, close the Mongoose connection

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

try {

  var options = {
    user: 'aw',
    pass: 'aw',
    useMongoClient: true,
  }

  const connection = mongoose.connect(config.db.url + '?authSource=admin', options);
  autoIncrement.initialize(connection);

  logger.info("Trying to connect to DB " + db_server);

  module.exports = {
    connection,
    autoIncrement
  }

} catch (err) {
  logger.info("Sever initialization failed ", err.message);
}
