import transform from '../../src/transformer/LiveCoin';

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

  describe('when source does not include symbol, cur or last', () => {
    it('throws an exception if symbol or last are not present', () => {
      const props = {};
      const response = JSON.stringify([{}]);

      expect(() => {
        transform(props, response);
      }).toThrow('Source returned invalid response');
    });
  });

  describe('when source includes symbol, cur and last', () => {
    const response = JSON.stringify([
      {
        "symbol": "BTC/USD",
        "last": 136.81697,
        "cur": "BTC",
        "high": 0.00057953,
        "low": 0.00056985,
        "volume": 10.2179534,
        "vwap": 0.0005772,
        "max_bid": 0.00058,
        "min_ask": 0.00056985,
        "best_bid": 0.0004945,
        "best_ask": 0.00057946
      },
      {
        "symbol": "LTC/USD",
        "last": 1.328799,
        "cur": "LTC",
        "high": 0.00057953,
        "low": 0.00056985,
        "volume": 10.2179534,
        "vwap": 0.0005772,
        "max_bid": 0.00058,
        "min_ask": 0.00056985,
        "best_bid": 0.0004945,
        "best_ask": 0.00057946
      },
      {
        "symbol": "ETH/USD",
        "last": 698.10657,
        "cur": "ETH",
        "high": 0.00057953,
        "low": 0.00056985,
        "volume": 10.2179534,
        "vwap": 0.0005772,
        "max_bid": 0.00058,
        "min_ask": 0.00056985,
        "best_bid": 0.0004945,
        "best_ask": 0.00057946
      },
      {
        "symbol": "DASH/USD",
        "last": 8324.21,
        "cur": "DASH",
        "high": 0.00057953,
        "low": 0.00056985,
        "volume": 10.2179534,
        "vwap": 0.0005772,
        "max_bid": 0.00058,
        "min_ask": 0.00056985,
        "best_bid": 0.0004945,
        "best_ask": 0.00057946
      },
      {
        "symbol": "XMR/USD",
        "last": 194.92005,
        "cur": "XMR",
        "high": 0.00057953,
        "low": 0.00056985,
        "volume": 10.2179534,
        "vwap": 0.0005772,
        "max_bid": 0.00058,
        "min_ask": 0.00056985,
        "best_bid": 0.0004945,
        "best_ask": 0.00057946
      },
    ]);

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

    it.only('returns array with only valid currencies', () => {
      const props = {
        currencies: ['BTC', 'LTC', 'ETH', 'DASH', 'XMR']
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
        }, {
          currency: 'DASH',
          rate: 8324.21,
        }, {
          currency: 'XMR',
          rate: 194.92005,
        }]);
    });
  });
});
