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
    describe('main', () => {
      const response = JSON.stringify({
        success: true,
        rates: {
          EUR: 1,
          USD: 1.28,
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
    });

    describe('when USD is present', () => {
      const response = JSON.stringify({
        success: true,
        rates: {
          EUR: 1,
          USD: 1.28,
        },
      });

      it('returns array with expected values', () => {
        const props = {
          currencies: ['USD', 'EUR', 'rate2', 'invalidRate'],
          type: false,
        };

        expect(transform(props, response)).toEqual([{ currency: 'EUR', rate: 0.7812, type: false }, { currency: 'USD', rate: 1, type: false }]);
      });
    });

    describe('when USD is not present', () => {
      const response = JSON.stringify({
        success: true,
        rates: {
          EUR: 1,
          MXN: 1.28,
        },
      });

      it('throws an exception when USD is not present', () => {
        const props = {
          currencies: ['MXN', 'EUR', 'rate2', 'invalidRate'],
          type: false,
        };

        expect(() => { transform(props, response); }).toThrow('USD not present');
      });
    });
  });
});
