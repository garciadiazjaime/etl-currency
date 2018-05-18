
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

  const promises = Object.keys(sources).reduce((accumulator, key) => {
    const source = sources[key];
    if (source.enable) {
      const props = {
        source: key,
        isProduction: config.get('env') === 'production',
        file: source.stubFile,
        sourceUrl: source.sourceUrl.replace('[token]', source.token),
        apiUrl: source.apiUrl,
        currencies: source.currencies,
      };
      accumulator.push(run(props));
    }
    return accumulator;
  }, []);

  return Promise.all(promises);
}

export default main;
