import transform from '../../src/transformer/liveCoin';

describe('liveCoin', () => {
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

  describe('when props.currency is invalid', () => {
    const response = JSON.stringify([]);
    it('throws and exception when props.currencies is falsy', () => {
      const props = {};
      expect(() => {
        transform(props, response);
      }).toThrow('Props.currencies were not passed');
    });

    it('throws and exception when props.currencies is an empty array', () => {
      const props = {
        currencies: [],
      };

      expect(() => {
        transform(props, response);
      }).toThrow('Props.currencies were not passed');
    });
  });

  describe('when source does not have USD entries', () => {
    it('returns an empty array', () => {
      const props = {
        currencies: ['BTC', 'LTC'],
      };
      const response = JSON.stringify([
        {
          symbol: 'BTC/MXN',
          last: 136.81697,
          cur: 'BTC',
        },
        {
          symbol: 'LTC/MXN',
          last: 1.328799,
          cur: 'LTC',
        },
      ]);

      expect(transform(props, response)).toEqual([]);
    });
  });

  describe('when source includes rates', () => {
    const response = JSON.stringify([
      {
        symbol: 'BTC/USD',
        last: 136.81697,
        cur: 'BTC',
      },
      {
        symbol: 'LTC/USD',
        last: 1.328799,
        cur: 'LTC',
      },
      {
        symbol: 'ETH/USD',
        last: 698.10657,
        cur: 'ETH',
      },
    ]);

    it('returns empty array when source does not include expected currencies', () => {
      const props = {
        currencies: ['expected-currency'],
      };

      expect(transform(props, response)).toEqual([]);
    });

    it('returns array with only valid currencies', () => {
      const props = {
        currencies: ['BTC', 'LTC', 'ETH'],
      };

      expect(transform(props, response))
        .toEqual([{
          currency: 'BTC',
          rate: 136.81697,
        }, {
          currency: 'LTC',
          rate: 1.328799,
        }, {
          currency: 'ETH',
          rate: 698.10657,
        }]);
    });
  });
});
