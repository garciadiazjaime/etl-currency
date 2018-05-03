const transform = (props, response) => {
  const data = response && JSON.parse(response)
  if (!data || !data.success) {
    throw('Source returned invalid response')
  }

  const { rates } = data
  if (!rates || !Object.keys(rates).length) {
    throw('Source did not return rates')
  }

  if (!props || !props.currencies || !props.currencies.length) {
    throw('Props.currencies were not passed')
  }

  return Object.keys(rates).reduce((accumulator, currency) => {
    if (props.currencies.includes(currency)) {
      accumulator.push({
        [currency]: rates[currency]
      })
    }
    return accumulator
  }, [])
}

export default transform