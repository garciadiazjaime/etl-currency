import readFile from '../../src/util/readFile';

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
      const response = readFile('./stubs/reafFile.stub.text');

      expect(response).resolves.toBe('readFile\n');
    });
  });
});
