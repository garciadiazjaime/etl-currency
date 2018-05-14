import util from 'util';

import readFile from '../../src/util/readFile';

jest.mock('request-promise-native', () => jest.fn(() => Promise.resolve('requestMade')));

describe('readFile', () => {
  describe('when parameter is missing', () => {
    it('throws an exception if no paramater is passed', () => {
      expect(() => {
        readFile();
      }).toThrow('invalid parameters');
    });
  });

  describe('when parameter passed', () => {
    it('reads file', () => {
      util.promisify = jest.fn(() => () => Promise.resolve('fileRead'));

      const response = readFile('file');

      expect(response).resolves.toBe('fileRead');
    });
  });
});
