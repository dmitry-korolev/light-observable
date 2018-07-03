# Light Observable
[![Build Status](https://travis-ci.org/dmitry-korolev/light-observable.svg?branch=master)](https://travis-ci.org/dmitry-korolev/light-observable) [![Coverage Status](https://coveralls.io/repos/github/dmitry-korolev/light-observable/badge.svg?branch=master)](https://coveralls.io/github/dmitry-korolev/light-observable?branch=master) [![Written in typescript](https://img.shields.io/badge/written_in-typescript-blue.svg)](https://www.typescriptlang.org/) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com) [![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/) [![npm](https://img.shields.io/npm/v/light-observable.svg)](https://www.npmjs.com/package/light-observable) [![Greenkeeper badge](https://badges.greenkeeper.io/dmitry-korolev/light-observable.svg)](https://greenkeeper.io/)

An implementation of Observables for JavaScript. Requires a Promise polyfill.

This is a fork of [zen-observable](https://github.com/zenparsing/zen-observable). Some of extras are inspired by [observable-operators](https://github.com/nmuldavin/ObservableOperators).

## Features:
* **Standard**: fully compatible with the [Observable Proposal](https://github.com/tc39/proposal-observable).
* **Tiny**: Observable itself is only [1078 bytes in gzip](.size-limit.js) (including [symbol-observable](https://github.com/benlesh/symbol-observable) package).
* **Type-safe**: written in typescript.
* **Reliable**: 100% code coverage.
* **Moderate**: only standard methods are included to the Observable and Observable prototype.

### Extras
* `pipe`: an utility to pipe functions together
    ```js
    import { pipe } from 'light-observable'
    import { from } from 'rxjs'
    import { mergeMap } from 'rxjs/operators'
  
    import myStream from './myStream'
  
    const RxStream = pipe(
      from,
      mergeMap(...)
    )(myStream)
    ```
* `createSubject`: an utility that returns a tuple of an observable stream and a controller sink.
    ```js
    import { createSubject } from 'light-observable'
    const [stream, sink] = createSubject()
  
    stream.subscribe(console.log)
    sink.next(1) // > 1
    sink.next(2) // > 2
    ```
* `EMPTY`: represents an empty Observable, which completes right after subscribing
* Bunch of pipeable operators:
    * `filter`
    * `map`
    * `forEach`
    * `merge`
    * `share`

## Install
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

## Why
Because sometimes you just don't need all these tons of classes, dozens of schedulers and countless operators. Only some of them. Someday.

## Notice on interoperability
RxJS doesn't use 'symbol-observable' polyfill. This may cause some weird issues with interop depending on the import order. It is recommended to install and import `symbol-observable` polyfill before RxJS.

See an [issue](https://github.com/benlesh/symbol-observable/issues/38) for details.

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
