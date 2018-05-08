import fixer from './sources/fixer';
import coinmarketcap from './sources/coinmarketcap';

async function main() {
  const currencies = await Promise.all([fixer(), coinmarketcap()]);
  console.log(currencies);
}


main();
