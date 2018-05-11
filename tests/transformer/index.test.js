import transformers from '../../src/transformer';

describe('transformers', () => {
  it('includes all transformers', () => {
    expect(Object.keys(transformers)).toEqual(['fixer', 'coinmarketcap', 'currencyLayer']);
  });
});
