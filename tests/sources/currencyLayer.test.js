import currencyLayer from '../../src/sources/currencyLayer';

jest.mock('../../src/util/load', () => () => [{ USDCAD: 1.28465 }, { USDPLN: 3.567027 }, {  USDMXN: 19.036598 }]);

describe('currencyLayer.js', () => {
  describe.only('when all calls work', () => {
    it('returns expected currencies', async () => {
      const currencies = await currencyLayer();

      expect(currencies).toEqual([{ USDCAD: 1.28465 }, { USDPLN: 3.567027 }, { USDMXN: 19.036598 }]);
    });
  });
});
