
import config from '../config';
import extract from '../util/extract';
import transform from '../transformer/coinmarketcap';
import load from '../util/load';

const props = {
  isProduction: config.get('env') === 'production',
  file: './stubs/coinmarketcap.json',
  fixerUrl: 'https://api.coinmarketcap.com/v2/ticker/',
  apiUrl: config.get('api.url'),
  currencies: ['BTC', 'LTC', 'ETH', 'ZEC', 'DASH', 'XRP', 'XMR'],
};


const main = () => extract(props)
  .then(response => transform(props, response))
  .then(currencies => load(props, currencies))
  .catch(console.log);


export default main;

