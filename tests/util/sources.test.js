import config from '../../src/config';
import sources from '../../src/util/sources';

describe('sources', () => {
  it('returns expected values', async () => {
    const response = await sources();
    const allSurces = config.get('sources');
    const activeSources = Object.keys(allSurces).reduce((accumulator, key) => {
      if (allSurces[key].enable) {
        accumulator.push(key);
      }
      return accumulator;
    }, []);

    expect(response.length).toBe(activeSources.length);
    expect(response).toMatchSnapshot();
  });
});
