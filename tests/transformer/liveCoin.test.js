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

  describe('when source does not include quotes', () => {
    it('throws an exception if quotes is not present', () => {
      const props = {};
      const response = JSON.stringify({});

      expect(() => {
        transform(props, response);
      }).toThrow('Source returned invalid response');
    });
  });

  describe('when source includes quotes', () => {
    const response = JSON.stringify({
      quotes: {
        LTC: 1,
        DASH: 1.328799,
        ETH: 1.28465,
        BTC: 3.567027,
        XMR: 19.036598,
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
        currencies: ['BTC', 'LTC', 'ETH', 'DASH', 'XMR'],
      };

      expect(transform(props, response))
        .toEqual([{
          currency: 'LTC',
          rate: 136.81697,
        }, {
          currency: 'DASH',
          rate: 1.328799,
        }, {
          currency: 'ETH',
          rate: 698.10657,
        }, {
          currency: 'BTC',
          rate: 8324.21,
        }, {
          currency: 'XMR',
          rate: 194.92005,
        }]);
    });
  });
});
