function transform(props, response) {
  if (!props || !response) {
    throw (new Error('Transformer recevied invalid parameters'));
  }

  const quotes = JSON.parse(response);
  const symbol = !quotes.find(obj => obj.symbol);
  const last = !quotes.find(obj => obj.last);
  const cur = !quotes.find(obj => obj.cur);

  if (symbol || last || cur) {
    throw (new Error('Source returned invalid response'));
  }

  if (!props.currencies || !props.currencies.length) {
    throw new Error('Props.currencies were not passed');
  }

  const currencies = quotes.filter(currency => props.currencies.includes(currency.cur) && currency.symbol.includes('/USD'));

  const currencyList = currencies.map((item) => {
    const newItem = {
      currency: item.cur,
      rate: item.last,
    };
    return newItem;
  });

  return currencyList;
}

export default transform;
