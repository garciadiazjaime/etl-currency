import transform from '../../src/transformer/coinmarketcap';

describe('coinmarketcap', () => {
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
    it('throws an exception if rates is an empty object', () => {
      const props = {};
      const response = JSON.stringify({
        data: {},
      });

      expect(() => {
        transform(props, response);
      }).toThrow('Source returned invalid response');
    });
  });

  describe('when source includes rates', () => {
    const response = JSON.stringify({
      data: {
        1: {
          symbol: 'BTC',
          quotes: {
            USD: {
              price: 9870.68,
            },
          },
        },
        2: {
          symbol: 'ETH',
          quotes: {
            USD: {
              price: 9870.68,
            },
          },
        },
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
        currencies: ['BTC', 'ETH', 'rate2', 'invalidRate'],
      };

      expect(transform(props, response)).toEqual([{
        currency: 'BTC',
        rate: 9870.68,
      }, {
        currency: 'ETH',
        rate: 9870.68,
      }]);
    });
  });
});
