import transform from '../../src/transformer/currencyLayer';

describe('currencyLayer', () => {
  describe('when parameter are missing', () => {
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

    it('throws an exception if quotes is an empty object', () => {
      const props = {};
      const response = JSON.stringify({
        quotes: {},
      });

      expect(() => {
        transform(props, response);
      }).toThrow('Source returned invalid response');
    });
  });

  describe('when source includes quotes', () => {
    const response = JSON.stringify({
      quotes: {
        USDUSD: 1,
        USDAUD: 1.328799,
        USDCAD: 1.28465,
        USDPLN: 3.567027,
        USDMXN: 19.036598,
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
        currencies: ['USDUSD', 'USDAUD', 'USDCAD', 'USDPLN', 'USDMXN'],
      };

      expect(transform(props, response))
        .toEqual([{
          USDUSD: 1,
        },
        {
          USDAUD: 1.328799,
        },
        {
          USDCAD: 1.28465,
        }, {
          USDPLN: 3.567027,
        }, {
          USDMXN: 19.036598,
        },
        ]);
    });
  });
});
