const app = require('./app');


const https = require('https');
const fs = require('fs');

const options = {
  key: fs.readFileSync('../'),
  cert: fs.readFileSync('test/fixtures/keys/agent2-cert.pem')
};

https.createServer(options, app.callback()).listen(3005);

app.listen(3000, () => {
  logger.info('YM Node School App listening on port 3000!');
});;
