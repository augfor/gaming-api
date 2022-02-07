require('dotenv').config();

const config = {
  port: process.env.PORT || 4000,
  database: {
    url: process.env.DATABASE_URL,
    protocol: process.env.DATABASE_PROTOCOL,
    username: process.env.DATABASE_USERNAME,
    password: process.env.DATABASE_PASSWORD,
  },
  pagination: {
    page: 1,
    limit: 10,
    skip: 0,
  },
  sort: {
    sortBy: {
      default: 'createdAt',
      fields: ['createdAt', 'updatedAt'],
    },
    direction: {
      default: 'desc',
      options: ['asc', 'desc'],
    },
  },
  token: {
    secret: process.env.TOKEN_SECRET,
    expires: process.env.TOKEN_EXPIRES,
  },
  cors: {
    origin: process.env.ACCESS_CONTROL_ALLOW_ORIGIN,
  },
  email: {
    sendgridApiKey: process.env.SENDGRID_API_KEY,
    senderEmail: process.env.SENDER_EMAIL,
    senderUsername: process.env.SENDER_USERNAME,
  },
};

module.exports = config;
