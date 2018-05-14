import load from '../../src/util/load';

jest.mock('request-promise-native', () => jest.fn(() => Promise.resolve('requestMade')));

describe('load', () => {
  describe('when parameters are missing', () => {
    it('throws an exception if no paramater is passed', () => {
      expect(() => {
        load();
      }).toThrow('invalid parameters');
    });

    it('throws an exception if apiUrl is missing', () => {
      const props = {
        file: 'file',
      };

      expect(() => {
        load(props);
      }).toThrow('invalid parameters');
    });
  });

  describe('when is production', () => {
    it('makes a request', () => {
      const props = {
        apiUrl: 'http://www.mintitmedia.com/',
        isProduction: true,
      };

      const response = load(props);

      expect(response).resolves.toBe('requestMade');
    });
  });

  describe('when is not production', () => {
    it('returns data', () => {
      const props = {
        apiUrl: 'http://www.mintitmedia.com/',
      };

      const response = load(props, 'data');

      expect(response).toBe('data');
    });
  });
});
