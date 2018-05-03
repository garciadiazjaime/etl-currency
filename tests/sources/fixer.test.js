import fixer from '../../src/sources/fixer'
import load from '../../src/util/load'

jest.mock('../../src/util/load', () => {
  return () => [ { EUR: 1 }, { MXN: 22.623886 }, { USD: 1.208463 } ]
})

describe('fixer.js', () => {

  describe.only('when all calls work', () => {

    it('returns expected currencies', async () => {
      const currencies = await fixer()

      expect(currencies).toEqual([ { EUR: 1 }, { MXN: 22.623886 }, { USD: 1.208463 } ])
    })
  })
})
