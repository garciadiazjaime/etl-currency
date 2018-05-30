import convict from 'convict';

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  sources: {
    fixer: {
      enable: {
        doc: 'Feature Flag to enable source',
        format: Boolean,
        default: true,
      },
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
      apiUrl: {
        doc: 'Mint Api Url',
        format: String,
        default: 'http://127.0.0.1:3000/rates',
        env: 'CURRENCY_API_URL',
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
      enable: {
        doc: 'Feature Flag to enable source',
        format: Boolean,
        default: true,
      },
      stubFile: {
        doc: 'Mock Response',
        format: String,
        default: './stubs/coinmarketcap.json',
      },
      apiUrl: {
        doc: 'Mint Api Url',
        format: String,
        default: 'http://127.0.0.1:3000/rates',
        env: 'CURRENCY_API_URL',
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
      enable: {
        doc: 'Feature Flag to enable source',
        format: Boolean,
        default: true,
      },
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
      apiUrl: {
        doc: 'Mint Api Url',
        format: String,
        default: 'http://127.0.0.1:3000/rates',
        env: 'CURRENCY_API_URL',
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
    liveCoin: {
      enable: {
        doc: 'Feature Flag to enable source',
        format: Boolean,
        default: true,
      },
      stubFile: {
        doc: 'Mock Response',
        format: String,
        default: './stubs/liveCoin.json',
      },
      apiUrl: {
        doc: 'Mint Api Url',
        format: String,
        default: 'http://127.0.0.1:3000/rates',
        env: 'CURRENCY_API_URL',
      },
      sourceUrl: {
        doc: 'Source Api Url',
        format: String,
        default: 'https://api.livecoin.net/exchange/ticker',
      },
      currencies: {
        doc: 'Active currencies',
        format: Array,
        default: ['BTC', 'LTC', 'ETH', 'ZEC', 'DASH', 'XRP', 'XMR'],
      },
    },
    eldolarenmexico: {
      enable: {
        doc: 'Feature Flag to enable source',
        format: Boolean,
        default: true,
      },
      stubFile: {
        doc: 'Mock Response',
        format: String,
        default: './stubs/eldolarenmexico.html',
      },
      apiUrl: {
        doc: 'Mint Api Url',
        format: String,
        default: 'http://127.0.0.1:3000/rates/usdmxn',
        env: 'CURRENCY_API_URL',
      },
      sourceUrl: {
        doc: 'Source Api Url',
        format: String,
        default: 'https://eldolarenmexico.com/',
      },
    },
  },
});

export default config;
