# Light Observable
[![Build Status](https://travis-ci.org/dmitry-korolev/light-observable.svg?branch=master)](https://travis-ci.org/dmitry-korolev/light-observable) [![Coverage Status](https://coveralls.io/repos/github/dmitry-korolev/light-observable/badge.svg?branch=master)](https://coveralls.io/github/dmitry-korolev/light-observable?branch=master) [![Written in typescript](https://img.shields.io/badge/written_in-typescript-blue.svg)](https://www.typescriptlang.org/) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![npm](https://img.shields.io/npm/v/light-observable.svg)](https://www.npmjs.com/package/light-observable) [![Greenkeeper badge](https://badges.greenkeeper.io/dmitry-korolev/light-observable.svg)](https://greenkeeper.io/)

An implementation of Observables for JavaScript. Requires a Promise polyfill.

This is a fork of [zen-observable](https://github.com/zenparsing/zen-observable). Some of extras are inspired by [observable-operators](https://github.com/nmuldavin/ObservableOperators).

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Features:](#features)
- [Differences from zen-observable](#differences-from-zen-observable)
- [Installation](#installation)
- [Usage](#usage)
- [Extras](#extras)
  - [Creation](#creation)
  - [Transforming](#transforming)
  - [Combining](#combining)
- [Why](#why)
- [Notice on interoperability](#notice-on-interoperability)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Features:
* **Standard**: fully compatible with the [Observable Proposal](https://github.com/tc39/proposal-observable).
* **Tiny**: Observable itself is less than [1 kilobyte in gzip](.size-limit.js) (including [symbol-observable](https://github.com/benlesh/symbol-observable) package).
* **Type-safe**: written in typescript.
* **Reliable**: 100% code coverage.
* **Moderate**: only standard methods are included to the Observable and Observable prototype + special `Observable.prototype.pipe` method that allows usage of pipeable operators.

## Differences from zen-observable
* Uses `symbol-observable` polyfill instead of own implementation.
* Subscribing and iterating over arrays in `.of` and `.from` methods are synchronous.
* `PartitialObserver` allows a `start` method, which will receive a subscription before calling the source.

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

## Extras
#### `Observable.prototype.pipe`
`light-observable` has a special `pipe` method, which is similar to any other pipe implementation. It applies provided functions from left to right. It allows usage of any function, including pipeable RxJS operators (although you **have to** pass RxJS `from` method first). This is the only non-standard method in `light-observable` Observable implementation.
```js
import { of } from 'light-observable/observable'
import { from } from 'rxjs'
import { filter, map } from 'rxjs/operators'

of(1, 2, 3, 4)
    .pipe(
      from,
      filter(x => x > 2),
      map(x => x * 2)
    )
    .subscribe(console.log)

// => 6, 8
```

### Creation
#### `EMPTY`
Represents an empty Observable, which completes right after subscribing.

#### `createSubject`:
Returns a tuple of an observable stream and a controller sink.
```js
import { createSubject } from 'light-observable/observable'
const [stream, sink] = createSubject()

stream.subscribe(console.log)
sink.next(1) // > 1
sink.next(2) // > 2
```

### Transforming
#### `filter`
#### `map`
#### `forEach`

### Combining
#### `concat`
#### `merge`

## Why
Because sometimes you just don't need all these tons of classes, dozens of schedulers and countless operators. Only some of them. Someday.

## Notice on interoperability
RxJS 6 doesn't use 'symbol-observable' polyfill. This may cause some weird issues with interop depending on the import order. It is recommended to install and import `symbol-observable` polyfill before RxJS.

See the [issue](https://github.com/benlesh/symbol-observable/issues/38) for details.

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
