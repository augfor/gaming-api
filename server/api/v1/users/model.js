const mongoose = require('mongoose');

const fields = {
  firstName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 256,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    maxLength: 256,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    maxLength: 256,
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 256,
  },
};

const user = new mongoose.Schema(fields, {
  timestamps: true,
});

const model = mongoose.model('user', user);

module.exports = {
  Model: model,
  fields,
};
