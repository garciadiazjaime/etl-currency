# ETL Currency

[![Build Status](https://travis-ci.org/garciadiazjaime/etl-currency.svg)](https://travis-ci.org/garciadiazjaime/etl-currency)

**Extract Transform Load** currencies from different sources.
The goal is to pull data from third party api's and save it to our API.

Development
----

###  Install Dependencies

`yarn`

### Build app

`yarn build -- --watch`

#### Run ETLs (build needs to be ran before)

`yarn start`

### Run tests
`yarn test -- --watch`

### Watch lint
`yarn lint -- --watch`


Sources
----

### Fixer documentation
https://fixer.io/documentation

This source requires registration in order to get a token.

### Coinmarketcap
https://coinmarketcap.com/api/

### eldolarenmexico
https://eldolarenmexico.com/
- [Banorte](goo.gl/UaTgzD)

### eldolar
http://www.eldolar.info/es-MX/mexico/dia/hoy


How to add a new source
----

- Add new configs (./src/config.js)
- Create new **transformer** (./src/transformer/)
- Expose new transformer (./src/transformer/index.js)
- Write tests for new transformer (./tests/transformer/)
- Adjust tests for sources (./tests/utils/sources.test.js)

How to contribute
----
- Feel free to Fork repo and create a PR against `master`.
- Ask to be added as a contributor, create your branch and open a PR against `master`.

Contact
----
For any question send us a line to: `info@mintitmedia.com`
