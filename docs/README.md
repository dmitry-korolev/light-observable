# Light Observable
[![Build Status](https://travis-ci.org/dmitry-korolev/light-observable.svg?branch=master)](https://travis-ci.org/dmitry-korolev/light-observable) [![Coverage Status](https://coveralls.io/repos/github/dmitry-korolev/light-observable/badge.svg?branch=master)](https://coveralls.io/github/dmitry-korolev/light-observable?branch=master) [![Written in typescript](https://img.shields.io/badge/written_in-typescript-blue.svg)](https://www.typescriptlang.org/) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![npm](https://img.shields.io/npm/v/light-observable.svg)](https://www.npmjs.com/package/light-observable) [![Greenkeeper badge](https://badges.greenkeeper.io/dmitry-korolev/light-observable.svg)](https://greenkeeper.io/)

Standard implementation of Observables for JavaScript. Requires a Promise polyfill.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Motivation](#motivation)
- [Extras](#extras)
  - [Consume](#consume)
  - [Create](#create)
  - [Transform](#transform)
  - [Filter](#filter)
  - [Combine](#combine)
  - [Combine higher-order streams](#combine-higher-order-streams)
  - [Handle errors](#handle-errors)
  - [Rate limit](#rate-limit)
  - [Delay](#delay)
- [Notice on interoperability](#notice-on-interoperability)
- [Credits](#credits)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features
* **Standard**: fully compatible with the [Observable Proposal](https://github.com/tc39/proposal-observable).
* **Tiny**: Observable itself is ~[1 kilobyte in gzip](.size-limit.js) (including [symbol-observable](https://github.com/benlesh/symbol-observable) package). **The whole library including ~80 operators and observable utilities is less than 6kb in gzip.**
* **Type-safe**: written in typescript.
* **Reliable**: 100% unit test coverage.
* **Moderate**: only standard methods are included to the Observable and Observable prototype + special `Observable.prototype.pipe` method that allows usage of pipeable operators.
* **Documented**: [see the docs](https://dmitry-korolev.github.io/light-observable/)!

## Installation
```bash
npm install light-observable
```

## Usage
```js
import { Observable } from 'light-observable'

const o = new Observable(observer => {
  observer.next(1)
  observer.next(2)
  observer.complete()
})

o.subscribe(console.log)
// > 1
// > 2
```

See [Observable proposal](https://github.com/tc39/proposal-observable) for other examples.

## Motivation
Because sometimes you just don't need all these tons of classes, dozens of schedulers and countless operators. Only some of them. Someday.

## Extras
[See the docs](https://dmitry-korolev.github.io/light-observable/) to learn about ~80 operators and observable utilities included in this library.

### Consume
* [forEach](https://dmitry-korolev.github.io/light-observable/consume/forEach.html)
  
### Create
* [of](https://dmitry-korolev.github.io/light-observable/create/of.html)
* [from](https://dmitry-korolev.github.io/light-observable/create/from.html)
* [fromEvent](https://dmitry-korolev.github.io/light-observable/create/fromEvent.html)
* [fromPromise](https://dmitry-korolev.github.io/light-observable/create/fromPromise.html)
* [interval](https://dmitry-korolev.github.io/light-observable/create/interval.html)
* [defer](https://dmitry-korolev.github.io/light-observable/create/defer.html)
* [empty](https://dmitry-korolev.github.io/light-observable/create/empty.html)

### Transform
* [map](https://dmitry-korolev.github.io/light-observable/transform/map.html)
* [mapTo](https://dmitry-korolev.github.io/light-observable/transform/mapTo.html)

### Filter
* [filter](https://dmitry-korolev.github.io/light-observable/filter/filter.html)

### Combine
* [concat](https://dmitry-korolev.github.io/light-observable/combine/concat.html)
* [combineLatest](https://dmitry-korolev.github.io/light-observable/combine/combineLatest.html)
* [merge](https://dmitry-korolev.github.io/light-observable/combine/merge.html)

### Combine higher-order streams
* [mergeAll](https://dmitry-korolev.github.io/light-observable/hos/mergeAll.html)

### Handle errors
* [catchError](https://dmitry-korolev.github.io/light-observable/errors/catchError.html)

### Rate limit
* [auditTime](https://dmitry-korolev.github.io/light-observable/limiting/auditTime.html)
* [debounceTime](https://dmitry-korolev.github.io/light-observable/limiting/debounceTime.html)

### Delay
* [delay](https://dmitry-korolev.github.io/light-observable/delay/delay.html)

## Notice on interoperability
RxJS 6 doesn't use 'symbol-observable' polyfill. This may cause some weird issues with interop depending on the import order. It is recommended to install and import `symbol-observable` polyfill before RxJS.

See the [issue](https://github.com/benlesh/symbol-observable/issues/38) for details.

## Credits
Originally this was forked from [zen-observable](https://github.com/zenparsing/zen-observable). Some of extras are inspired by [observable-operators](https://github.com/nmuldavin/ObservableOperators).

## License
```
Copyright 2018 Tinkoff Bank

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
```