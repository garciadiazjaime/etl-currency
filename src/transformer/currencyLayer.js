const transform = (props, response) => {
  const data = JSON.parse(response);
  if (!data || !data.success) {
    throw (new Error('Fixer return invalid response'));
  }

  const { quotes } = data;
  if (!Object.keys(quotes)) {
    throw (new Error('Fixer return invalid response'));
  }

  const wantedRates = Object.keys(quotes).reduce((accumulator, currency) => {
    if (props.currencies.includes(currency)) {
      accumulator.push({
        [currency]: quotes[currency],
      });
    }
    return accumulator;
  }, []);

  return wantedRates;
};

export default transform;
