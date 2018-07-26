# `reduce`
```typescript
type reduce = <T, R>(
  fn: (result: R, value: T, index: number) => void,
  initial: R
) => (stream: Observable<T>) => Promise<R>
```

Starts consuming a source, reducing it to the single value with a provided function starting from an initial value. Returns a Promise, which resolves with a resulting value when the source completes, or rejects if the source errors.

```typescript
import { interval } from 'light-observable/observable'
import { reduce, skip, take } from 'light-observable/operators'

const promise = interval(50).pipe(
  skip(1),
  take(5),
  reduce((prev, value) => prev * value, 1)
)

promise.then(console.log)
/*
 -> 120
*/
```

Also available as function:
```typescript
import { reduce, interval } from 'light-observable/observable'
import { skip, take } from 'light-observable/operators'

const stream = interval(50).pipe(
  skip(1),
  take(5)
)

const promise = reduce((prev, value) => prev * value, 1, stream)
promise.then(console.log)
```
