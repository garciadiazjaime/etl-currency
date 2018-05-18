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

  // This produces the list of currencies and values
  // const currencies = quotes.map(x => x.cur + ': ' + x.last);
  
  // This produces the list of currencies and values filtered by props.currencies
  // const currencies = quotes.map(obj => {
  //   let rObj = {};
  // 
  //   if (props.currencies.includes(obj.cur)){
  //     rObj.cur = obj.cur;
  //     rObj.last = obj.last;
  //     console.log(rObj.cur + ': ' + rObj.last);
  //   }
  // 
  //   return rObj;
  // });
  
  const currencies = quotes.filter(currency => props.currencies.includes(currency.cur));
  // const currencies = currencyList.map(x => x.cur + ': ' + x.last);
  const currencyList = currencies.map(function(item) { 
    item.currency = item.cur;
    item.value = item.last;
    delete item.cur; 
    delete item.last; 
    delete item.symbol; 
    delete item.high; 
    delete item.low;
    delete item.volume; 
    delete item.vwap;  
    delete item.max_bid; 
    delete item.min_ask; 
    delete item.best_bid; 
    delete item.best_ask; 
    return item; 
  });
    
  return currencyList;
  
}

export default transform;
