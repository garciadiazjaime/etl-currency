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

  return Object.keys(rates).reduce((accumulator, currency) => {
    if (props.currencies.includes(currency)) {
      accumulator.push({
        currency,
        rate: rates[currency],
      });
    }
    return accumulator;
  }, []);
}

export default transform;
