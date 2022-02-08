const request = require('supertest');

const server = require('../server');
const config = require('../server/config');
const database = require('../server/database');
const { Model: User } = require('../server/api/v1/users/model');

describe('Users', () => {
  beforeAll(() => {
    database.connect();
  });

  beforeEach(() => {
    // Create test data
  });

  afterEach(async () => {
    await User.deleteMany({});
  });

  afterAll(() => {
    database.disconnect();
  });

  test('Sign Up', async () => {
    const response = await request(server).post('/api/users/signup').send({
      firstName: 'Augusto',
      lastName: 'Forero',
      email: 'a.forarc@gmail.com',
      password: '12345678',
    });

    const { body } = response;
    const { id } = body;

    expect(id).not.toBeNull();
  });
});
