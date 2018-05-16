import transformer from '../../src/transformer';
import sources from '../../src/util/sources';

describe('sources', () => {
  it('returns expected values', async () => {
    const response = await sources();

    expect(Object.keys(transformer).length).toBe(response.length);
    expect(response).toMatchSnapshot();
  });
});
