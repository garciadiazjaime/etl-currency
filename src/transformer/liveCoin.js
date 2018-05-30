function transform(props, response) {
  if (!props || !response) {
    throw (new Error('Transformer recevied invalid parameters'));
  }

  if (!props.currencies || !props.currencies.length) {
    throw new Error('Props.currencies were not passed');
  }

  const quotes = JSON.parse(response);
  const currencies = quotes.filter(currency => props.currencies.includes(currency.cur) && currency.symbol.includes('/USD'));

  return currencies.map(item => ({
    currency: item.cur,
    rate: item.last,
  }));
}

export default transform;
