const app = require('./app');
const logger = require('./utils/logService')('index');
const http = require('http');  
const https = require('https'); 

const listenCallback = function () {
  const { port } = this.address();
  logger.info(`Application started on ${port}`);

};
if (!module.parent && process.env.NODE_HTTPS) {
  const protocolSecrets = {
    key: fs.readFileSync('fixtures/key.key'),
    cert: fs.readFileSync('fixtures/cert.crt')
  };
  https
    .createServer(protocolSecrets, app.callback())
    .listen(LISTEN_PORT, listenCallback);
}

if (!module.parent && !process.env.NODE_HTTPS) {
  http
    .createServer(app.callback())
    .listen(3000, listenCallback);
};
