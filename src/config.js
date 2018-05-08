import convict from 'convict';

// Define a schema
const config = convict({
  env: {
    doc: 'The application environment.',
    format: ['production', 'development', 'test'],
    default: 'development',
    env: 'NODE_ENV',
  },
  api: {
    url: {
      doc: 'API Url',
      format: String,
      default: 'http://127.0.0.1:3030/currency',
      env: 'CURRENCY_API_URL',
    },
  },
  fixer: {
    token: {
      doc: 'Access token',
      format: String,
      default: '',
      env: 'FIXER_TOKEN',
    }
  },
  currencyLayer: {
    token: {
      doc: 'Access token',
      format: String,
      default: 'b7e9097ad7389732c12a86ecc47baeb0',
      env: 'CURRENCY_LAYER_TOKEN',
    }
  }
});

export default config;
