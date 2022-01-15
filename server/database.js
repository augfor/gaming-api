const mongoose = require('mongoose');

const { logger } = require('./config/logger');

exports.connect = (options = {}) => {
  mongoose.connect(
    process.env.MONGO_DB_URI || 'mongodb://127.0.0.1:27017/gaming',
    { useNewUrlParser: true }
  );

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

exports.disconnect = () => {
  mongoose.connection.close(() => {
    logger.info('Database disconnected successfully');
  });
};
