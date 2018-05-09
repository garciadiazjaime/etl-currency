const transform = (props, response) => {
  const data = response && JSON.parse(response);

  if (!data) {
    throw new Error('Source returned invalid response');
  }

  const rates = data.data;
  if (!rates || !Object.keys(rates).length) {
    throw new Error('Source did not return rates');
  }

  if (!props || !props.currencies || !props.currencies.length) {
    throw new Error('Props.currencies were not passed');
  }

  return Object.keys(rates).reduce((accumulator, index) => {
    const currency = rates[index];
    if (props.currencies.includes(currency.symbol)) {
      accumulator.push({
        [currency.symbol]: currency.quotes.USD.price,
      });
    }
    return accumulator;
  }, []);
};

export default transform;
