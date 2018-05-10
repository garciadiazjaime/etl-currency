function transform(props, response) {
  if (!props || !response) {
    throw (new Error('Transformer recevied invalid parameters'));
  }

  const { quotes } = JSON.parse(response);
  if (!quotes || !Object.keys(quotes).length) {
    throw (new Error('Source returned invalid response'));
  }

  if (!props.currencies || !props.currencies.length) {
    throw new Error('Props.currencies were not passed');
  }

  return Object.keys(quotes).reduce((accumulator, currency) => {
    if (props.currencies.includes(currency)) {
      accumulator.push({
        [currency]: quotes[currency],
      });
    }
    return accumulator;
  }, []);
}

export default transform;
