import transform from '../../src/transformer/eldolarenmexico';

describe('fixer', () => {
  describe('when parameters are missing', () => {
    it('throws an exception if no paramater is passed', () => {
      expect(() => {
        transform();
      }).toThrow('Transformer recevied invalid parameters');
    });

    it('throws an exception if props are empty', () => {
      expect(() => {
        transform(null, 'stubHtml');
      }).toThrow('Transformer recevied invalid parameters');
    });

    it('throws an exception if response is empty', () => {
      expect(() => {
        transform({}, null);
      }).toThrow('Transformer recevied invalid parameters');
    });
  });

  describe('when source does not have currencies table', () => {
    it('returns empty array', () => {
      const props = {};
      const stubHtml = 'stubHtml';

      const rates = transform(props, stubHtml);

      expect(rates).toEqual([]);
    });
  });

  describe('when source returns valid response', () => {
    it('returns expected rates', () => {
      const props = {};
      const stubHtml = `
        <table>
          <tr>
            <td><img alt="BAJIO" /></td>
            <td class="tdcompra">$18.40</td>
            <td class="tdventa">$19.60</td>
          </tr>
          <tr>
            <td><img alt="BANAMEX" /></td>
            <td class="tdcompra">$18.2065</td>
            <td class="tdventa">$19.335</td>
          </tr>
          <tr>
            <td><img alt="BANCOAZTECA" /></td>
            <td class="tdcompra">$18.00</td>
            <td class="tdventa">$19.10</td>
          </tr>
          <tr>
            <td>invalid</td>
          </tr>
        </table>
      `;

      const rates = transform(props, stubHtml);

      expect(rates).toEqual([{
        buy: '18.40',
        entity: 'BAJIO',
        sale: '19.60',
      }, {
        buy: '18.2065',
        entity: 'BANAMEX',
        sale: '19.335',
      }, {
        buy: '18.00',
        entity: 'BANCOAZTECA',
        sale: '19.10',
      }]);
    });
  });
});
