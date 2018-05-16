import extract from '../../src/util/extract';

jest.mock('request-promise-native', () => jest.fn(() => Promise.resolve('requestMade')));
jest.mock('../../src/util/readFile', () => jest.fn(() => Promise.resolve('fileRead')));

describe('extract', () => {
  describe('when parameters are missing', () => {
    it('throws an exception if no paramater is passed', () => {
      expect(() => {
        extract();
      }).toThrow('invalid parameters');
    });

    it('throws an exception if sourceUrl is missing', () => {
      const props = {
        file: 'file',
      };

      expect(() => {
        extract(props);
      }).toThrow('invalid parameters');
    });

    it('throws an exception if file is missing', () => {
      const props = {
        sourceUrl: 'sourceUrl',
      };

      expect(() => {
        extract(props);
      }).toThrow('invalid parameters');
    });
  });

  describe('when is production', () => {
    it('makes a request', () => {
      const props = {
        file: 'file',
        sourceUrl: 'http://www.mintitmedia.com/',
        isProduction: true,
      };

      const response = extract(props);

      expect(response).resolves.toBe('requestMade');
    });
  });

  describe('when is not production', () => {
    it('reads file', () => {
      const props = {
        file: 'file',
        sourceUrl: 'http://www.mintitmedia.com/',
      };

      const response = extract(props);

      expect(response).resolves.toBe('fileRead');
    });
  });
});
