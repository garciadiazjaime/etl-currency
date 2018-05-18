function transform(props, response) {
  if (!props || !response) {
    throw (new Error('Transformer recevied invalid parameters'));
  }

  const quotes = JSON.parse(response);
  if (!quotes || !Object.keys(quotes).length) {
    throw (new Error('Source returned invalid response'));
  }

  if (!props.currencies || !props.currencies.length) {
    throw new Error('Props.currencies were not passed');
  }
  
  const currencies = quotes.filter(currency => props.currencies.includes(currency.cur) && currency.symbol.includes('/USD'));
  // const currencies = currencyList.map(x => x.cur + ': ' + x.last);
  const currencyList = currencies.map(function(item) { 
    item = {
      item.currency = item.cur;
      item.value = item.last;
    }
    return item; 
  });
    
  return currencyList;
  
}

export default transform;
