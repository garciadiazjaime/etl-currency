import sources from './util/sources';

async function main() {
  const currencies = await sources();
  console.log('currencies', currencies);
}

main();
