
import config from '../config'
import extract from '../util/extract.js'
import load from '../util/load'

const props = {
  isProduction: config.get('env') === 'production',
  file: './stubs/fixer.json',
  fixerUrl: `http://data.fixer.io/api/latest?access_key=${config.get('fixer.token')}&format=1`,
  apiUrl: config.get('api.url'),
  currencies: ['EUR', 'USD', 'MXN']
}

const transform = (props, response) => {
  const data = JSON.parse(response)
  if (!data || !data.success) {
    throw('Fixer return invalid response')
  }

  const { rates } = data
  if (!Object.keys(rates)) {
    throw('Fixer return invalid response')
  }

  const wantedRates = Object.keys(rates).reduce((accumulator, currency) => {
    if (props.currencies.includes(currency)) {
      accumulator.push({
        [currency]: rates[currency]
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


