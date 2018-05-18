import transform from '../../src/transformer/fixer';

describe('fixer', () => {
  describe('when parameters are missing', () => {
    it('throws an exception if no paramater is passed', () => {
      expect(() => {
        transform();
      }).toThrow('Transformer recevied invalid parameters');
    });

    it('throws an exception if props are empty', () => {
      expect(() => {
        transform(null, {});
      }).toThrow('Transformer recevied invalid parameters');
    });

    it('throws an exception if response is empty', () => {
      expect(() => {
        transform({}, null);
      }).toThrow('Transformer recevied invalid parameters');
    });
  });

  describe('when source does not include rates', () => {
    it('throws an exception if rates is not present', () => {
      const props = {};
      const response = JSON.stringify({});

      expect(() => {
        transform(props, response);
      }).toThrow('Source returned invalid response');
    });

    it('throws an exception if rates is an empty object', () => {
      const props = {};
      const response = JSON.stringify({
        quotes: {},
      });

      expect(() => {
        transform(props, response);
      }).toThrow('Source returned invalid response');
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
      const props = {};

      expect(() => {
        transform(props, response);
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

      expect(transform(props, response)).toEqual([{
        currency: 'rate1',
        rate: 'rate1',
      }, {
        currency: 'rate2',
        rate: 'rate2',
      }]);
    });
  });
});
