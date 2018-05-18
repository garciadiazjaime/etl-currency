import cheerio from 'cheerio';

function transform(props, response) {
  if (!props || !response) {
    throw (new Error('Transformer recevied invalid parameters'));
  }

  const rates = [];
  const jQuery = cheerio.load(response);
  jQuery('table tr').each((i, row) => {
    const entity = jQuery(row).find('img').attr('alt');
    if (entity) {
      const buy = jQuery(row).find('.tdcompra').text().trim()
        .replace('$', '');
      const sale = jQuery(row).find('.tdventa').text().trim()
        .replace('$', '');
      rates.push({
        entity,
        buy,
        sale,
      });
    }
  });

  return rates;
}

export default transform;
