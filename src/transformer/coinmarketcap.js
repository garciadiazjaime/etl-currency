function transform(props, response) {
  if (!props || !response) {
    throw (new Error('Transformer recevied invalid parameters'));
  }

  const { data: rates } = JSON.parse(response);
  if (!rates || !Object.keys(rates).length) {
    throw (new Error('Source returned invalid response'));
  }

  if (!props || !props.currencies || !props.currencies.length) {
    throw new Error('Props.currencies were not passed');
  }

  return Object.keys(rates).reduce((accumulator, index) => {
    const currency = rates[index];
    if (props.currencies.includes(currency.symbol)) {
      accumulator.push({
        currency: currency.symbol,
        rate: currency.quotes.USD.price,
      });
    }
    return accumulator;
  }, []);
}

export default transform;
