 import config from '../config'
 import extract from '../util/extract.js'
 import load from '../util/load'
 import transform from '../transformer/currencyLayer'
 const props = {
   isProduction: config.get('env') === 'production',
   file: './stubs/currencyLayer.json',
   sourceUrl:`http://apilayer.net/api/live?access_key=${config.get('currencyLayer.token')}0&currencies=USD,AUD,CAD,PLN,MXN&format=1`,
   apiUrl: config.get('api.url'),
   currencies: ['USDPLN', 'USDCAD', 'USDMXN']
 }

 const main = async () => {
   return extract(props)
     .then(response => transform(props, response))
     .then(currencies => load(props, currencies))
     .catch(console.log)
 }

 export default main

  
