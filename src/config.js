import convict from 'convict';

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  currencyApiUrl: {
    doc: 'Mint api url',
    format: String,
    default: 'http://127.0.0.1:3030/currency',
    env: 'CURRENCY_API_URL',
  },
  sources: {
    fixer: {
      token: {
        doc: 'Access token',
        format: String,
        default: '',
        env: 'FIXER_TOKEN',
      },
      stubFile: {
        doc: 'Mock Response',
        format: String,
        default: './stubs/fixer.json',
      },
      sourceUrl: {
        doc: 'Source Api Url',
        format: String,
        default: 'http://data.fixer.io/api/latest?access_key=[token]&format=1',
      },
      currencies: {
        doc: 'Active currencies',
        format: Array,
        default: ['EUR', 'USD', 'MXN', 'CHF', 'KYD', 'GBP', 'KWD', 'CNY'],
      },
    },
    coinmarketcap: {
      token: {
        doc: 'Access token',
        format: String,
        default: '',
        env: 'FIXER_TOKEN',
      },
      stubFile: {
        doc: 'Mock Response',
        format: String,
        default: './stubs/coinmarketcap.json',
      },
      sourceUrl: {
        doc: 'Source Api Url',
        format: String,
        default: 'https://api.coinmarketcap.com/v2/ticker/',
      },
      currencies: {
        doc: 'Active currencies',
        format: Array,
        default: ['BTC', 'LTC', 'ETH', 'ZEC', 'DASH', 'XRP', 'XMR'],
      },
    },
    currencyLayer: {
      token: {
        doc: 'Access token',
        format: String,
        default: '',
        env: 'CURRENCY_LAYER_TOKEN',
      },
      stubFile: {
        doc: 'Mock Response',
        format: String,
        default: './stubs/currencyLayer.json',
      },
      sourceUrl: {
        doc: 'Source Api Url',
        format: String,
        default: 'http://apilayer.net/api/live?access_key=[token]0&currencies=USD,AUD,CAD,PLN,MXN&format=1',
      },
      currencies: {
        doc: 'Active currencies',
        format: Array,
        default: ['USDPLN', 'USDCAD', 'USDMXN'],
      },
    },
  },
});

export default config;
