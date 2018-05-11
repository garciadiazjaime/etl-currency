import extract from '../../src/util/extract';

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
});
