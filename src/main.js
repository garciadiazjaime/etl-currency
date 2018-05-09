import clEtl from './sources/currencyLayer';
import fixerEtl from './sources/fixer';

Promise.all([fixerEtl(), clEtl()])
  .then(console.log);