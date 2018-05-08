import transform from '../../src/transformer/fixer';

describe('fixer', () => {
  describe('when empty response is passed', () => {
    it('throws an exception', () => {
      expect(() => {
        transform();
      }).toThrow('Source returned invalid response');
    });
  });

  describe('when .success is falsy', () => {
    it('throws an exception', () => {
      const response = JSON.stringify({});

      expect(() => {
        transform(null, response);
      }).toThrow('Source returned invalid response');
    });
  });

  describe('when source does not include rates', () => {
    it('throws an exception', () => {
      const response = JSON.stringify({
        success: true,
      });

      expect(() => {
        transform(null, response);
      }).toThrow('Source did not return rates');
    });

    it('throws an exception if rates is an empty object', () => {
      const response = JSON.stringify({
        success: true,
        rates: {},
      });

      expect(() => {
        transform(null, response);
      }).toThrow('Source did not return rates');
    });
  });

  describe('when source includes rates', () => {
    const response = JSON.stringify({
      success: true,
      rates: {
        rate1: 'rate1',
        rate2: 'rate2',
      },
    });

    it('throws and exception when props.currencies is falsy', () => {
      expect(() => {
        transform(null, response);
      }).toThrow('Props.currencies were not passed');
    });

    it('throws and exception when props.currencies is empty array', () => {
      const props = {
        currencies: [],
      };

      expect(() => {
        transform(props, response);
      }).toThrow('Props.currencies were not passed');
    });

    it('returns empty array when source does not include valid currencies', () => {
      const props = {
        currencies: ['rate0'],
      };

      expect(transform(props, response)).toEqual([]);
    });

    it('returns array with only valid currencies', () => {
      const props = {
        currencies: ['rate0', 'rate1', 'rate2', 'invalidRate'],
      };

      expect(transform(props, response)).toEqual([{ rate1: 'rate1' }, { rate2: 'rate2' }]);
    });
  });
});
