const http = require('http');

const app = require('./server');
const { connect } = require('./server/database');

const config = require('./server/config');
const { port } = config;

connect();

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
