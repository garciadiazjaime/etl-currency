
import config from '../config';
import extract from '../util/extract';
import transform from '../transformer/fixer';
import load from '../util/load';

const props = {
  isProduction: config.get('env') === 'production',
  file: './stubs/fixer.json',
  sourceUrl: `http://data.fixer.io/api/latest?access_key=${config.get('fixer.token')}&format=1`,
  apiUrl: config.get('api.url'),
  currencies: ['EUR', 'USD', 'MXN'],
};


const main = () => extract(props)
  .then(response => transform(props, response))
  .then(currencies => load(props, currencies))
  .catch(console.log);


export default main;
