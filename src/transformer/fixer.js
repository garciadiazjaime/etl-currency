function transform(props, response) {
  if (!props || !response) {
    throw (new Error('Transformer recevied invalid parameters'));
  }

  const { rates } = JSON.parse(response);
  if (!rates || !Object.keys(rates).length) {
    throw new Error('Source returned invalid response');
  }

  if (!props.currencies || !props.currencies.length) {
    throw new Error('Props.currencies were not passed');
  }

  let USD = null;
  const currencies = Object.keys(rates).reduce((accumulator, currency) => {
    if (props.currencies.includes(currency)) {
      accumulator.push({
        currency,
        rate: rates[currency],
        type: props.type,
      });
      if (currency === 'USD') {
        USD = rates[currency];
      }
    }
    return accumulator;
  }, []);

  if (!USD) {
    throw (new Error('USD not present'));
  }

  return currencies.map(item => (Object.assign({}, item, {
    rate: Math.floor((item.rate / USD) * 10000) / 10000,
  })));
}

export default transform;
