 import config from '../config'
 import extract from '../util/extract.js'
 import load from '../util/load'

 const props = {
   isProduction: config.get('env') === 'production',
   file: './stubs/currencyLayer.json',
   sourceUrl:`http://apilayer.net/api/live?access_key=${config.get('currencyLayer.token')}0&currencies=USD,AUD,CAD,PLN,MXN&format=1`,
   apiUrl: config.get('api.url'),
   currencies: ['USDPLN', 'USDCAD', 'USDMXN']
 }

 const transform = (props, response) => {
   const data = JSON.parse(response)
   if (!data || !data.success) {
     throw('Fixer return invalid response')
   }

   const { quotes } = data
   if (!Object.keys(quotes)) {
     throw('Fixer return invalid response')
   }

   const wantedRates = Object.keys(quotes).reduce((accumulator, currency) => {
     if (props.currencies.includes(currency)) {
       accumulator.push({
         [currency]: quotes[currency]
       })
     }
     return accumulator
   }, [])

   return wantedRates
 }

 const main = async () => {
   return extract(props)
     .then(response => transform(props, response))
     .then(currencies => load(props, currencies))
     .catch(console.log)
 }

 export default main

  
