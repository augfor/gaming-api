const http = require('http');

const app = require('./server');
const config = require('./server/config');

const hostname = '127.0.0.1';
const { port } = config;

const server = http.createServer(app);

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
