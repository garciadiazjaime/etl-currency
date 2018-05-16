import sources from '../../src/util/sources';

describe('sources', () => {
  it('returns expected values', async () => {
    const response = await sources();
    expect(response).toEqual([
      [
        {
          CHF: 1.197226,
        },
        {
          CNY: 7.652477,
        },
        {
          EUR: 1,
        },
        {
          GBP: 0.877709,
        },
        {
          KWD: 0.36339,
        },
        {
          KYD: 0.991168,
        },
        {
          MXN: 22.623886,
        },
        {
          USD: 1.208463,
        },
      ],
      [
        {
          BTC: 9870.68,
        }, {
          LTC: 179.561,
        }, {
          XRP: 0.912325,
        }, {
          DASH: 505.126,
        }, {
          XMR: 243.154,
        }, {
          ETH: 811.324,
        }, {
          ZEC: 306.783,
        },
      ],
      [
        {
          USDCAD: 1.28465,
        }, {
          USDPLN: 3.567027,
        }, {
          USDMXN: 19.036598,
        },
      ],
    ]);
  });
});
