function transform(props, response) {
  
  if (!props || !response) {
    throw (new Error('Transformer recevied invalid parameters'));
  }

  const quotes = JSON.parse(response);
  console.log(quotes);
  if (!quotes.find(function (obj) { return obj.symbol; }) || !quotes.find(function (obj) { return obj.last; }) || !quotes.find(function (obj) { return obj.cur; })) {
    throw (new Error('Source returned invalid response'));
  }

  if (!props.currencies || !props.currencies.length) {
    throw new Error('Props.currencies were not passed');
  }
  
  const currencies = quotes.filter(currency => props.currencies.includes(currency.cur) && currency.symbol.includes('/USD'));
  
  const currencyList = currencies.map(function(item) { 
    item.currency = item.cur;
    item.rate = item.last;
    delete item.cur,
    delete item.symbol,
    delete item.last,
    delete item.high,
    delete item.low,
    delete item.volume,
    delete item.vwap,
    delete item.max_bid,
    delete item.min_ask,
    delete item.best_bid,
    delete item.best_ask
    return item; 
  });
    
  return currencyList;
  
}

export default transform;
