# Observable
See [Observable proposal](https://github.com/tc39/proposal-observable) to learn about observables and their usage scope.

> The Observable type can be used to model push-based data sources such as DOM events, timer intervals, and sockets. In addition, observables are:
> * Compositional: Observables can be composed with higher-order combinators.
> * Lazy: Observables do not start emitting data until an observer has subscribed.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Usage](#usage)
- [API](#api)
  - [`Observable.of`](#observableof)
  - [`Observable.from`](#observablefrom)
  - [`Observable.prototype.pipe`](#observableprototypepipe)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Usage
See usage examples on the [Observable proposal homepage](https://github.com/tc39/proposal-observable#observable)

## API
### `Observable.of`
See usage examples on the [Observable proposal homepage](https://github.com/tc39/proposal-observable#observableof)

### `Observable.from`
See usage examples on the [Observable proposal homepage](https://github.com/tc39/proposal-observable#observablefrom)

### `Observable.prototype.pipe`
`light-observable` has a special `pipe` method, which is similar to any other pipe implementation. It applies provided functions from left to right. It allows usage of any function, including pipeable RxJS operators (although you **have to** pass RxJS `from` method first). This is the only non-standard method in `light-observable` Observable implementation.

Example usage with RxJS:
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
