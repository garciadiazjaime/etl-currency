import fixer from '../../src/sources/fixer'

jest.mock('request-promise-native', () => {
  return () => Promise.resolve([ { EUR: 1 }, { MXN: 22.623886 }, { USD: 1.208463 } ])
})

describe('fixer.js', () => {
  it('returns expected currencies', async () => {

    const currencies = await fixer()

    expect(currencies).toEqual([ { EUR: 1 }, { MXN: 22.623886 }, { USD: 1.208463 } ])
  })
})
