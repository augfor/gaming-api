const mongoose = require('mongoose');

const { logger } = require('./config/logger');

exports.connect = ({ url = '', username, password }, options = {}) => {
  let dburl = '';

  if (username && password) {
    dburl = `mongodb://${username}:${password}@${url}`;
  } else {
    dburl = `mongodb://${url}`;
  }

  mongoose.connect(dburl, {
    ...options,
  });

  mongoose.connection.on('connected', () => {
    logger.info('Database connected');
  });

  mongoose.connection.on('close', () => {
    logger.info('Database disconnected');
  });

  mongoose.connection.on('error', (error) => {
    logger.error(`Database error: ${error}`);
  });

  process.on('SIGINT', () => {
    mongoose.connection.close(() => {
      logger.info('Database disconnected due to app termination');
      process.exit(0);
    });
  });
};

exports.disconnected = () => {
  mongoose.connection.close(() => {
    logger.info('Database disconnected successfully');
    process.exit(0);
  });
};
