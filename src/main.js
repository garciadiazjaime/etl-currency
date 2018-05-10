import fixer from './sources/fixer';
import coinmarketcap from './sources/coinmarketcap';
import currencyLayer from './sources/currencyLayer';

async function main() {
  const currencies = await Promise.all([fixer(), coinmarketcap(), currencyLayer()]);
  console.log(currencies);
}
main();
