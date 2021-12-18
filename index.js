const http = require('http');

const app = require('./server');
const config = require('./server/config');
const { connect } = require('./server/database');

const { port, database } = config;

connect({
  url: database.url,
  username: database.username,
  password: database.password,
});

const server = http.createServer(app);

server.listen(port, () => {
  console.log(`Server running at ${port}`);
});
