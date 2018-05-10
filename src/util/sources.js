
import config from '../config';
import transformer from '../transformer';
import extract from './extract';
import load from './load';

const run = props => extract(props)
  .then(response => transformer[props.source](props, response))
  .then(currencies => load(props, currencies))
  .catch(console.log);


async function main() {
  const sources = config.get('sources');

  const promises = Object.keys(sources).map((key) => {
    const source = sources[key];
    const props = {
      source: key,
      isProduction: config.get('env') === 'production',
      file: source.stubFile,
      sourceUrl: source.sourceUrl.replace('[token]', source.token),
      apiUrl: config.get('currencyApiUrl'),
      currencies: source.currencies,
    };
    return run(props);
  });

  return Promise.all(promises);
}

export default main;
