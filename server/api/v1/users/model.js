const mongoose = require('mongoose');
const { hash, compare } = require('bcryptjs');
const { isEmail } = require('validator');
const { body } = require('express-validator');

const sanitizers = [
  body('firstName').escape(),
  body('lastName').escape(),
  body('email').escape(),
  body('password').escape(),
];

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
    unique: true,
    validate: {
      validator(value) {
        return isEmail(value);
      },
      message: (props) => `${props.value} is not a valid email!`,
    },
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minLength: 6,
    maxLength: 256,
  },
};

const hiddenFields = ['password'];

const user = new mongoose.Schema(fields, {
  timestamps: true,
  toJSON: {
    virtuals: true,
  },
  toObject: {
    virtuals: true,
  },
});

user
  .virtual('fullname')
  .get(function getFullName() {
    return `${this.firstName} ${this.lastName}`;
  })
  .set(function setFullName(value) {
    const [firstName = '', lastName = ''] = value.split(' ');

    this.firstName = firstName;
    this.lastName = lastName;
  });

user.methods.toJSON = function toJSON() {
  const document = this.toObject();

  hiddenFields.forEach((field) => {
    if (document[field] !== undefined) {
      delete document[field];
    }
  });

  return document;
};

user.pre('save', async function save(next) {
  if (this.isNew || this.isModified('password')) {
    this.password = await hash(this.password, 10);
  }

  next();
});

user.methods.verifyPassword = function verifyPassword(value) {
  return compare(value, this.password);
};

const model = mongoose.model('user', user);

module.exports = {
  Model: model,
  fields,
  sanitizers,
};
