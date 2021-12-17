const { sortTransform } = require('./index.js');

describe('Utils', () => {
  describe('sortTransform', () => {
    test('Order desc by createdAt', () => {
      const sortBy = 'createdAt';
      const direction = 'desc';

      const result = sortTransform(sortBy, direction);

      expect(result).toEqual('-createdAt');
    });
  });
});
