import sources from './util/sources';

async function main() {
  try {
    const currencies = await sources();
    console.log('currencies', currencies);
  } catch (exception) {
    console.log({ exception });
  }
}

main();
